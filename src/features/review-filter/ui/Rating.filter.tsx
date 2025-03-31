import { IBaseComponent } from "shared/general/types/base-component.type"
import { Rating } from "shared/ui/rating"

interface IProps extends IBaseComponent {
    
}

export const RatingFilter: React.FC<IProps> = (props) => {
    const {className, css} = props
    return(
        <div className={`border rounded-sm p-1 flex flex-row w-fit gap-2 ${className}`} style={css}>
            <p className="!text-sm !font-normal">С рейтингом от</p>
            <Rating rating={0}/>
        </div>
    )
}