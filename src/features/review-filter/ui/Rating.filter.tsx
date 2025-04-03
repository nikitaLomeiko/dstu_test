import { IBaseComponent } from "shared/general/types/base-component.type"
import { Rating } from "shared/ui/rating"
import { filterStore } from "../model/store/filter.mobx"
import { observer } from "mobx-react-lite"


export const RatingFilter: React.FC<IBaseComponent> = observer((props) => {
    const {className, css} = props
    const {state: {rating}} = filterStore

    return(
        <div className={`border rounded-sm p-1 flex flex-row w-fit gap-2 ${className}`} style={css}>
            <p className="!text-sm !font-normal">С рейтингом от</p>
            <Rating onChange={(ind) => filterStore.changeRating(ind)} rating={rating}/>
        </div>
    )
})