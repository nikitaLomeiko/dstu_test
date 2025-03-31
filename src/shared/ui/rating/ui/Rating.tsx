import { IBaseComponent } from "shared/general/types/base-component.type"
import { FaStar } from "react-icons/fa";

interface IProps extends IBaseComponent {
    rating: number;
    onChange?: () => void;
}

export const Rating: React.FC<IProps> = (props) => {
    const {onChange, rating, className, css} = props

    return(
        <div className={`flex flex-row gap-1 items-center ${className}`} style={css}>
            {Array(5).fill('').map((_, index) => <FaStar fill={rating > index ? '#ffb703' : '#33333340'}/>)}
        </div>
    )
}