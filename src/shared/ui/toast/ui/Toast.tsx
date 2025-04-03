import { useEffect } from "react";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {
    title: string,
    message: string,
    show: boolean,
    onClose: () => void
    timeout?: number
}

export const Toast: React.FC<IProps> = (props) => {
  const { className, css, message, title, show, onClose, timeout = 3000 } = props;

  useEffect(() => {
    setTimeout(() => {
        onClose(    )
    }, timeout);
  }, [])

  return (
    <div
      className={`toast z-90 fixed !bottom-3 !right-0 !m-auto !left-0 К ${className} ${show ? "block!" : "!hiden"}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={css}
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};
