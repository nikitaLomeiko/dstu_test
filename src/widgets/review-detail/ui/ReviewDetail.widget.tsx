import { IReview, ReviewDetail } from "entities/review";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

interface IProps extends Omit<IReview, "id">, IBaseComponent {}

export const ReviewDetailWidget: React.FC<IProps> = (props) => {
  return <ReviewDetail {...props} featureSlot={
    <div className="flex flex-row gap-4 items-center">
        <button><FaPen size={14} /></button>
        <button><MdOutlineDelete fill="red" size={22}/></button>
    </div>} />;
};
