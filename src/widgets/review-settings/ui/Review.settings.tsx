import { CategoryFilter, RatingFilter } from "features/review-filter";
import { DateSort } from "features/review-sort";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { FaSave } from "react-icons/fa";
import { filterStore } from "features/review-filter/model";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const ReviewSettings: React.FC<IBaseComponent> = observer((props) => {
  const { className, css } = props;

  const [showToast, setShow] = useState(false)

  const handleSaveFilter = () => {
    filterStore.saveToLocalStorage()
    setShow(true)

    setTimeout(() => {
      setShow(false)
    }, 5000);
  }

  return (
    <div className={`bg-gray-400/10 py-2 lg:!pb-5 relative ${className}`} style={css}>
      <div className="container-md relative">
        <div className="flex flex-row items-center gap-2 lg:!gap-5 absolute top-0 right-2">
          <button onClick={() => handleSaveFilter()}>
            <FaSave className="size-4 lg:size-5" />
          </button>
          <button
            onClick={() => filterStore.clearAll()}
            type="button"
            className="btn btn-outline-danger !p-1 !text-[10px] lg:!text-sm"
          >
            Очистить
          </button>
        </div>
        <div className="mt-2">
          <p>Категории</p>
          <CategoryFilter className="mt-2" />
        </div>
        <div className="flex flex-row gap-2 items-center mt-3 lg:justify-between">
          <RatingFilter />
          <DateSort />
        </div>
      </div>
      <div className={`toast !bg-green-600 z-90 fixed !bottom-3 !right-0 !m-auto !left-0 ${showToast ? 'block!' : '!hiden'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">успешно!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">Настройки фильтрации успешно сохранены</div>
      </div>
    </div>
  );
});
