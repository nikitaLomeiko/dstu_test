import { IComponentActions } from "features/review-form/model/types";
import { FaPen } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent, IComponentActions {}

export const ReviewActionsRow: React.FC<IProps> = (props) => {
  const { onChange, onDelete, className, css } = props;

  return (
    <div className={`flex flex-row gap-4 items-center ${className}`} style={css}>
      <button onClick={onChange}>
        <FaPen size={14} />
      </button>
      <button onClick={onDelete}>
        <MdOutlineDelete fill="red" size={22} />
      </button>
    </div>
  );
};
