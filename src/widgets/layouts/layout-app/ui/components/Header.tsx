import React from "react";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { Logo } from "shared/ui/logo";

interface IProps extends IBaseComponent {
    children?: React.ReactNode
}

export const Header: React.FC<IProps> = (props) => {
  const { className, css, children } = props;
  return (
    <div className={`bg-blue-600 py-1 lg:!py-2 ${className}`} style={css}>
      <div className="container-md flex flex-row items-center justify-between">
        <Logo />
        {children}
      </div>
    </div>
  );
};
