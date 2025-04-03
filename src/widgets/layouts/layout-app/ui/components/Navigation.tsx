import { IBaseComponent } from "shared/general/types/base-component.type";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export const Navigation: React.FC<IBaseComponent> = (props) => {
  const { className, css } = props;
  return (
    <nav className={`flex flex-row gap-3 items-center ${className}`} style={css}>
      <a href="https://t.me/barsik_new" target="_blank">
        <FaTelegram fill="#fff" className="size-6 lg:size-8" />
      </a>
      <a href="https://github.com/nikitaLomeiko" target="_blank">
        <FaGithub fill="#fff" className="size-6 lg:size-8" />
      </a>
    </nav>
  );
};
