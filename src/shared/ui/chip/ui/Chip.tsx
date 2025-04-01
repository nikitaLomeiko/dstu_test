import { IBaseComponent } from "shared/general/types/base-component.type"

interface IProps extends IBaseComponent {
    children?: React.ReactNode;
    value?: string;
}

export const Chip: React.FC<IProps> = (props) => {
    const {children, className, css, value} = props
    return(
        <div className={`bg-gray-400/20 w-fit p-1 px-2 lg:!px-6 rounded-full cursor-pointer transition-colors hover:bg-gray-400/60 ${className}`} style={css}>
            {children === undefined ? <p className="text-sm">{value}</p> : children}
        </div>
    )
}