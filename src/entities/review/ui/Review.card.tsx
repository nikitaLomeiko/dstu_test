import { IBaseComponent } from "shared/general/types/base-component.type";
import { IReview } from "../model/types";
import { Rating } from "shared/ui/rating";
import { HiDotsVertical } from "react-icons/hi";
import { ReviewHeader } from "./components/ReviewHeader";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/route";

interface IProps extends Omit<IReview, 'timestamp'>, IBaseComponent {
  featureSlot?: React.ReactNode;
  formSlot?: React.ReactNode;
  isChange?: boolean;
}

export const ReviewCard: React.FC<IProps> = (props) => {
  const {
    className,
    css,
    date,
    dateUpdate,
    nickname,
    rating,
    category,
    comment,
    featureSlot,
    formSlot,
    isChange = false, 
    id,
  } = props;

  const navigator = useNavigate()

  return (
    <div className={`card !w-full relative ${className}`} style={{ width: "18rem", ...css }}>
      {!isChange ? (
        <>
          <button
            className="dropdown-toggle h-[25px] after:opacity-0 absolute top-4 right-4"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <HiDotsVertical />
          </button>
          <div className="dropdown-menu h-fit">{featureSlot}</div>
          <div className="card-body">
            <ReviewHeader nickname={nickname} category={category} />
            <div className="mt-2">
              <div className="flex flex-row gap-2 !items-center">
                <Rating rating={rating} />
                <p className="opacity-50">{dateUpdate === "" ? date : `изменено: ${dateUpdate}`}</p>
              </div>
              <p className="card-text mt-1 overflow-hidden line-clamp-4">{comment}</p>
            </div>
            <button type="button" onClick={() => navigator(`${RoutePath.reviewDetail.path}${id}`)} className="btn btn-link !p-0 mt-2">
              Читать больше
            </button>
          </div>
        </>
      ) : (
        <>{formSlot}</>
      )}
    </div>
  );
};
