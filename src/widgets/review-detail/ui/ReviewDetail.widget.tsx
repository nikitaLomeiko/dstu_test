import { getReviewById, incrementViewdReview, IReview, ReviewDetail, reviewStore } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { useQuery } from "@tanstack/react-query";
import { EndpointsEnum } from "shared/api";
import { useEffect, useState } from "react";
import { ReviewActionsRow, ReviewForm, useMutationReview } from "features/review-form";
import { observer } from "mobx-react-lite";
import { categoriesConfig } from "features/review-filter";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/route";
import { StatusData } from "shared/components/status-data";

interface IProps extends IBaseComponent {
  id: string;
}

export const ReviewDetailWidget: React.FC<IProps> = observer((props) => {
  const { id, className, css } = props;

  const {
    state: { reviews },
  } = reviewStore;

  const navigate = useNavigate();

  const [shouldFetch, setShouldFetch] = useState(false);
  const [review, setReview] = useState<IReview | null>(null);
  const [isChange, setChange] = useState(false);

  const { mutationRemove, mutationUpdate } = useMutationReview(reviews);

  useEffect(() => {
    const request = async () => {
      await incrementViewdReview(id);
    };

    request();
  }, []);

  const handleRemove = async (id: string) => {
    mutationRemove.mutate(id, {
      onSuccess: () => {
        reviewStore.deleteReview(id);
        navigate(RoutePath.reviews.path);
      },
    });
  };

  const handleUpdate = async (review: IReview, clearFunc: () => void) => {
    mutationUpdate.mutate(review, {
      onSuccess: () => {
        reviewStore.changeReview(review);
        setReview(review);
        setChange(false);
        clearFunc();
      },
    });
  };

  const { isLoading, isError } = useQuery({
    queryKey: [EndpointsEnum.review, id],
    queryFn: async () => {
      const data = await getReviewById(id);

      if (data.status === 200) {
        setReview(data.data);
        setShouldFetch(false);
      }

      return data;
    },
    enabled: shouldFetch,
  });

  useEffect(() => {
    const data = reviews.find((item) => item.id === id);

    if (!data) {
      setShouldFetch(true);
      return;
    }

    setReview(data);
  }, []);

  return (
    <StatusData className={className} css={css} isLoading={isLoading} isError={isError}>
      {review !== null && (
        <ReviewDetail
          className={className}
          isChange={isChange}
          {...review}
          formSlot={
            <ReviewForm
              isChanged
              className="p-4"
              initialForm={review}
              onCancel={() => setChange(false)}
              onPresent={handleUpdate}
              categoryConfig={categoriesConfig}
            />
          }
          featureSlot={<ReviewActionsRow onChange={() => setChange(true)} onDelete={() => handleRemove(review.id)} />}
        />
      )}
    </StatusData>
  );
});
