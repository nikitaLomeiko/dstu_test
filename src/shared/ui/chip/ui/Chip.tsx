import { IBaseComponent } from "shared/general/types/base-component.type"

interface IProps extends IBaseComponent {
    children?: React.ReactNode;
    value?: string;
    isActive?: boolean,
    onClick: () => void
}

export const Chip: React.FC<IProps> = (props) => {
    const {children, className, css, value, isActive, onClick} = props
    return(
        <div onClick={onClick} className={`w-fit p-1 px-2 lg:!px-6 rounded-full cursor-pointer transition-colors ${isActive ? 'bg-blue-400 text-white hover:bg-blue-500/60' : 'bg-white hover:!bg-gray-300/20'} ${className}`} style={css}>
            {children === undefined ? <p className="text-sm">{value}</p> : children}
        </div>
    )
}