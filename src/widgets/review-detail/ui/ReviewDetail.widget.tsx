import { getReviewById, incrementViewdReview, IReview, ReviewDetail, reviewStore } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { MdError } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EndpointsEnum } from "shared/api";
import { useEffect, useState } from "react";
import { changeReviewById, deleteReviewById, ReviewActionsRow, ReviewForm } from "features/review-form";
import { observer } from "mobx-react-lite";
import { categoriesConfig } from "features/review-filter";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/route";

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

  const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: deleteReviewById,
    onSuccess: (_, id) => {
      reviewStore.deleteReview(id);
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
      navigate(RoutePath.reviews.path);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: changeReviewById,
    onSuccess: (_, review) => {
      reviewStore.changeReview(review);
      setReview(review);
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
      setChange(false);
    },
  });

  const handleRemove = async (id: string) => {
    mutationRemove.mutate(id);
  };

  const handleUpdate = async (review: IReview, clearFunc: () => void) => {
    mutationUpdate.mutate(review, { onSuccess: clearFunc });
  };

  const { isLoading, isError } = useQuery({
    queryKey: [EndpointsEnum.review],
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

  useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const data = await incrementViewdReview(id);
      return data;
    },
  });

  useEffect(() => {
    const data = reviews.find((item) => item.id === id);

    if (!data) {
      setShouldFetch(true);
      return;
    }

    setReview(data);
  }, []);

  if (isLoading) {
    return (
      <div className={`w-full items-center flex justify-center ${className}`} style={css}>
        <div className="spinner-border text-primary mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`w-full items-center flex justify-center ${className}`} style={css}>
        <div className="flex flex-row items-center gap-1">
          <MdError className="fill-red-500" />
          <p className="text-red-500">Ошибка при загрузке отзывов</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => console.log(queryClient.getQueryData([EndpointsEnum.review]))}>ывпвып</button>

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
          featureSlot={
            <ReviewActionsRow onChange={() => setChange(true)} onDelete={() => handleRemove(review.id)} />
          }
        />
      )}
    </>
  );
});
