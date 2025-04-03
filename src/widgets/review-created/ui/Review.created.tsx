import { IReview, reviewStore } from "entities/review";
import { categoriesConfig } from "features/review-filter/model/config/categories.config";
import { ReviewForm, useMutationReview } from "features/review-form";
import { IBaseComponent } from "shared/general/types/base-component.type";

export const ReviewCreated: React.FC<IBaseComponent> = (props) => {
  const { className, css } = props;

  const {state: {reviews}} = reviewStore
  const {mutationCreate} = useMutationReview(reviews)

  const handleCreate = (data: IReview, clearFunc: () => void) => {
    mutationCreate.mutate(data, {onSuccess: () => {
      reviewStore.addNewReview(data);
      clearFunc()
    }})
  }

  return (
    <div className={`navbar-toggle w-full ${className}`} style={css}>
      <p className="d-inline-flex gap-1 !w-full">
        <button
          className="btn btn-outline-primary !w-full"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Создать новый отзыв
        </button>
      </p>
      <div className="collapse visible py-3" id="collapseExample">
          <ReviewForm categoryConfig={categoriesConfig} error={mutationCreate.error?.message} initialForm={{rating: 1}} onPresent={handleCreate}/>
      </div>
    </div>
  );
};
