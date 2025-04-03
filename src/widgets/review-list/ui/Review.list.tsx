import { IReview, ReviewCard, reviewStore } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { observer } from "mobx-react-lite";
import { ReviewActionsCol, ReviewForm, useMutationReview } from "features/review-form";
import { ListWrapper } from "./components/List.wrapper";
import React, { useState } from "react";
import { categoriesConfig } from "features/review-filter/model/config/categories.config";

export const ReviewList: React.FC<IBaseComponent> = observer((props) => {
  const {
    state: { reviews },
  } = reviewStore;

  const [changedId, setChangedId] = useState<string | null>(null);
  const { mutationRemove, mutationUpdate } = useMutationReview(reviews);

  const handleRemove = async (id: string) => {
    mutationRemove.mutate(id, { onSuccess: () => reviewStore.deleteReview(id) });
  };

  const handleUpdate = async (review: IReview, clearFunc: () => void) => {
    mutationUpdate.mutate(review, {
      onSuccess: () => {
        reviewStore.changeReview(review);
        setChangedId(null);
        clearFunc();
      },
    });
  };

  return (
    <ListWrapper {...props}>
      {reviews.length > 0 ? (
        <>
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
                  isChanged
                  categoryConfig={categoriesConfig}
                  error={mutationUpdate.error?.message}
                  initialForm={review}
                  onPresent={handleUpdate}
                  onCancel={() => setChangedId(null)}
                  className="!p-5"
                />
              }
            />
          ))}
        </>
      ) : (
        <p className="text-gray-700 text-center mt-5">Отзывов нет</p>
      )}
    </ListWrapper>
  );
});