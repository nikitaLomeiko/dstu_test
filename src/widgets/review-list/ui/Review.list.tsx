import { IReview, ReviewCard, reviewStore } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { observer } from "mobx-react-lite";
import { deleteReviewById, ReviewActionsCol } from "features/review-form";
import { ListWrapper } from "./components/List.wrapper";
import { EndpointsEnum } from "shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypeClientResult } from "shared/api/model/types";

export const ReviewList: React.FC<IBaseComponent> = observer((props) => {
  const {
    state: { reviews },
  } = reviewStore;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteReviewById,
    onSuccess: (_, id) => {
      reviewStore.deleteReview(id)
      queryClient.setQueryData([EndpointsEnum.review], (oldData: TypeClientResult<IReview[]>) => {
        return {
          ...oldData,
          data: (oldData.data as IReview[]).filter((review: { id: number }) => review.id !== id),
          total: Number(oldData.total) - 1
        };
      });

      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
    },
  });

  const handleRemove = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    mutation.mutate(id);
  };

  return (
    <ListWrapper {...props}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          {...review}
          featureSlot={<ReviewActionsCol onChange={() => null} onDelete={(e) => handleRemove(review.id, e)} />}
        />
      ))}
    </ListWrapper>
  );
});
