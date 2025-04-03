import { IBaseComponent } from "shared/general/types/base-component.type";
import { FaRegUserCircle } from "react-icons/fa";

interface IProps extends IBaseComponent {
  nickname: string;
  category: string;
}

export const ReviewHeader: React.FC<IProps> = (props) => {
  const { nickname, className, css, category } = props;

  return (
    <div className={`flex flex-row gap-2 ${className}`} style={css}>
      <FaRegUserCircle size={24} />
      <div>
        <h5 className="card-title">{nickname}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary underline !font-normal">{category}</h6>
      </div>
    </div>
  );
};
