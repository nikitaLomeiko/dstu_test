import { IBaseComponent } from "shared/general/types/base-component.type";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";

interface IProps extends IBaseComponent {
  children: React.ReactNode;
}

export const LayoutApp: React.FC<IProps> = (props) => {
  const { children, className, css } = props;

  return (
    <div className={`${className}`} style={css}>
      <Header>
        <Navigation/>
      </Header>
      {children}
    </div>
  );
};
