import { IReview, ReviewCard, reviewStore } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { observer } from "mobx-react-lite";
import { changeReviewById, deleteReviewById, ReviewActionsCol, ReviewForm } from "features/review-form";
import { ListWrapper } from "./components/List.wrapper";
import { EndpointsEnum } from "shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const ReviewList: React.FC<IBaseComponent> = observer((props) => {
  const {
    state: { reviews },
  } = reviewStore;

  const [changedId, setChangedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: deleteReviewById,
    onSuccess: (_, id) => {
      reviewStore.deleteReview(id);
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: changeReviewById,
    onSuccess: (_, review) => {
      reviewStore.changeReview(review);
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
      setChangedId(null);
    },
  });

  const handleRemove = async (id: number) => {
    mutationRemove.mutate(id);
  };

  const handleUpdate = async (review: IReview, clearFunc: () => void) => {
    mutationUpdate.mutate(review, {onSuccess: clearFunc});
  };

  return (
    <ListWrapper {...props}>
      {reviews.length > 0 ? 
      (<>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          {...review}
          isChange={review.id === changedId}
          featureSlot={
            <ReviewActionsCol onChange={() => setChangedId(review.id)} onDelete={() => handleRemove(review.id)} />
          }
          formSlot={
            <ReviewForm
              error={mutationUpdate.error?.message}
              initialForm={review}
              onPresent={handleUpdate}
              onCancel={() => setChangedId(null)}
              className="!p-5"
            />
          }
        />
      ))}
      </>) : (<p className="text-gray-700 text-center mt-5">Отзывов нет</p>)}
    </ListWrapper>
  );
});
