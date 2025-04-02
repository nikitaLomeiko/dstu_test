import { IBaseComponent } from "shared/general/types/base-component.type";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

interface IProps extends IBaseComponent {
  rating: number;
  onChange?: (rating: number) => void;
}

export const Rating: React.FC<IProps> = (props) => {
  const { onChange, rating, className, css } = props;

  const [starIndexHover, setStarIndex] = useState(0);

  return (
    <div onMouseLeave={() => setStarIndex(0)} className={`flex flex-row gap-1 items-center cursor-pointer ${className}`} style={css}>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <FaStar
            onClick={() => onChange?.(index+1)}
            onMouseEnter={() => setStarIndex(onChange !== undefined ? (index+1) : 0)}
            className={`transition-colors cursor-pointer ${index < starIndexHover ? 'fill-[#ffb70350]' : ''}`}
            fill={rating > index ? "#ffb703" : "#33333340"}
          />
        ))}
    </div>
  );
};
