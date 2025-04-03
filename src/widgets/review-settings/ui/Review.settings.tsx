import { CategoryFilter, RatingFilter } from "features/review-filter";
import { DateSort } from "features/review-sort";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { FaSave } from "react-icons/fa";
import { filterStore } from "features/review-filter/model";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Toast } from "shared/ui/toast";

export const ReviewSettings: React.FC<IBaseComponent> = observer((props) => {
  const { className, css } = props;

  const [showToast, setShow] = useState(false)

  const handleSaveFilter = () => {
    filterStore.saveToLocalStorage()
    setShow(true)
  }

  return (
    <div className={`bg-gray-400/10 py-2 lg:!pb-5 relative ${className}`} style={css}>
      <div className="container-md relative">
        <div className="flex flex-row items-center gap-2 lg:!gap-5 absolute top-0 right-2">
          <button onClick={() => handleSaveFilter()}>
            <FaSave className="size-4 lg:size-5 transition-colors hover:fill-blue-600" />
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
      <Toast className="!bg-green-600" onClose={() => setShow(false)} show={showToast} title="Успешно" message="Настройки фильтрации успешно сохранены"/>
    </div>
  );
});
