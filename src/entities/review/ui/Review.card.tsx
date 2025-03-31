import { IBaseComponent } from "shared/general/types/base-component.type";
import { IReview } from "../model/types";
import { Rating } from "shared/ui/rating";
import { HiDotsVertical } from "react-icons/hi";
import { ReviewHeader } from "./components/ReviewHeader";

interface IProps extends Omit<IReview, "id">, IBaseComponent {}

export const ReviewCard: React.FC<IProps> = (props) => {
  const { className, css, date, dateUpdate, nickname, rating, category, comment } = props;

  return (
    <div className={`card !w-full relative ${className}`} style={{ width: "18rem", ...css }}>
      <button className="absolute top-4 right-4">
        <HiDotsVertical />
      </button>
      <div className="card-body">
        <ReviewHeader nickname={nickname} category={category}/>
        <div className="mt-2">
          <div className="flex flex-row gap-2 !items-center">
            <Rating rating={rating} />
            <p className="opacity-50">{dateUpdate === undefined ? date : `изменено: ${dateUpdate}`}</p>
          </div>
          <p className="card-text mt-1 overflow-hidden line-clamp-4">{comment}</p>
        </div>
        <button type="button" className="btn btn-link !p-0 mt-2">
          Читать больше
        </button>
      </div>
    </div>
  );
};
