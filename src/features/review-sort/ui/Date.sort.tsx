import { observer } from "mobx-react-lite";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { sortStore } from "../model/store";

export const DateSort: React.FC<IBaseComponent> = observer((props) => {
  const { className, css } = props;

  const {
    state: { typeSort },
  } = sortStore;

  return (
    <div className={`${className} dropdown`} style={css}>
      <button
        className="btn btn-secondary dropdown-toggle !text-sm !p-0 !px-2 !py-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {typeSort === "deafult" && "Сортировка"}
        {typeSort === "asc" && "Сначала старые"}
        {typeSort === "desc" && "Сначала новые"}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            onClick={() => sortStore.changeTypeSort("deafult")}
            className={`dropdown-item transition-colors ${
              typeSort === "deafult" ? "!bg-blue-600" : "hover:!bg-gray-400/30"
            }`}
            type="button"
          >
            По умолчанию
          </button>
        </li>
        <li>
          <button
            onClick={() => sortStore.changeTypeSort("desc")}
            className={`dropdown-item transition-colors ${
              typeSort === "desc" ? "!bg-blue-600" : "hover:!bg-gray-400/30"
            }`}
            type="button"
          >
            Сначала новые
          </button>
        </li>
        <li>
          <button
            onClick={() => sortStore.changeTypeSort("asc")}
            className={`dropdown-item transition-colors ${
              typeSort === "asc" ? "!bg-blue-600" : "hover:!bg-gray-400/30"
            }`}
            type="button"
          >
            Сначала старые
          </button>
        </li>
      </ul>
    </div>
  );
});
