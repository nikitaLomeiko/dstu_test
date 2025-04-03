import { MdError } from "react-icons/md";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}

export const StatusData: React.FC<IProps> = (props) => {
  const { className, css, children, isError, isLoading } = props;

  return (
    <div className={className} style={css}>
      {isLoading && (
        <div className={`w-full items-center flex justify-center ${className}`} style={css}>
          <div className="spinner-border text-primary mt-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className={`w-full items-center flex justify-center ${className}`} style={css}>
          <div className="flex flex-row items-center gap-1">
            <MdError className="fill-red-500" />
            <p className="text-red-500">Ошибка при загрузке данных</p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
