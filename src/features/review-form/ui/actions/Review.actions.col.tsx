import { IComponentActions } from "features/review-form/model/types";
import { FaPen } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent, IComponentActions {}

export const ReviewActionsCol: React.FC<IProps> = (props) => {
  const { onChange, onDelete, className, css } = props;

  return (
    <ul className={`p-0 h-[60px] ${className}`} style={css}>
      <li>
        <button onClick={onChange} className="btn w-full !flex !flex-row !items-center gap-3 !ml-1" type="button">
          <FaPen size={12} />
          <p>Изменить</p>
        </button>
      </li>
      <li>
        <button onClick={onDelete} className="btn w-full !flex !flex-row !items-center gap-2" type="button">
          <MdOutlineDelete fill="red" size={18} />
          <p>Удалить</p>
        </button>
      </li>
    </ul>
  );
};
