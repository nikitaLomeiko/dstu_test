import { IBaseComponent } from "shared/general/types/base-component.type";
import { Chip } from "shared/ui/chip";
import { categoriesConfig } from "../model/config/categories.config";
import { filterStore } from "../model/store/filter.mobx";
import { observer } from "mobx-react-lite";

export const CategoryFilter: React.FC<IBaseComponent> = observer((props) => {
  const { className, css } = props;

  const {
    state: { categorySelectIds },
  } = filterStore;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} style={css}>
      {categoriesConfig.map((item, index) => (
        <Chip
          key={index}
          isActive={categorySelectIds.includes(index)}
          onClick={() => filterStore.toggleSelectCategory(index)}
          value={item}
        />
      ))}
    </div>
  );
});
