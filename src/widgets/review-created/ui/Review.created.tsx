import { ReviewForm } from "features/review-form";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {}

export const ReviewCreated: React.FC<IProps> = (props) => {
  const { className, css } = props;


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
          <ReviewForm/>
      </div>
    </div>
  );
};
