import { QueryClient, useMutation } from "@tanstack/react-query";
import { IReview, reviewStore } from "entities/review";
import { createNewReview, ReviewForm } from "features/review-form";
import { EndpointsEnum } from "shared/api";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {}

export const ReviewCreated: React.FC<IProps> = (props) => {
  const { className, css } = props;

  const {state: {reviews}} = reviewStore

  const queryClient = new QueryClient()

  const mutationCreate = useMutation({
    mutationFn: createNewReview,
    onSuccess: (_, review) => {
      reviewStore.addNewReview(review);
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
    },
  });

  const handleCreate = (data: IReview) => {
    mutationCreate.mutate(data)
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
          <ReviewForm initialForm={{rating: 1}} onPresent={handleCreate}/>
      </div>
    </div>
  );
};
