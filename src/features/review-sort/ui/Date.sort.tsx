import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {}

export const DateSort: React.FC<IProps> = (props) => {
  const { className, css } = props;

  return (
    <div className={`${className} dropdown`} style={css}>
      <button className="btn btn-secondary dropdown-toggle !text-sm !p-0 !px-2 !py-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Сортировка
      </button>
      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item" type="button">
            По умолчанию
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button">
            Сначала новые
          </button>
        </li>
        <li>
          <button className="dropdown-item" type="button">
            Сначала старые
          </button>
        </li>
      </ul>
    </div>
  );
};
