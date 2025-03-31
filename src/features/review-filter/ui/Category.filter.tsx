import { IBaseComponent } from "shared/general/types/base-component.type";
import { Chip } from "shared/ui/chip";

interface IProps extends IBaseComponent {}
export const CategoryFilter: React.FC<IProps> = (props) => {
  const { className, css } = props;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} style={css}>
      <Chip value="Фильмы" />
      <Chip value="Рестораны" />
      <Chip value="Книги" />
      <Chip value="Игры" />
      <Chip value="Технологии" />
      <Chip value="Фильмы" />
      <Chip value="Рестораны" />
      <Chip value="Фильмы" />
    </div>
  );
};
