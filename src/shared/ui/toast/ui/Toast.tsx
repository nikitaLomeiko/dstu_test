import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IBaseComponent } from "shared/general/types/base-component.type";

interface IProps extends IBaseComponent {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
  timeout?: number;
}

export const Toast: React.FC<IProps> = (props) => {
  const { className, css, message, title, show, onClose, timeout = 3000 } = props;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [show, timeout, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`toast z-90 fixed bottom-3 right-0 left-0 m-auto ${className} ${show ? "block!" : "!hiden"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={css}
        >
          <div className="toast-header">
            <strong className="me-auto">{title}</strong>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="toast-body">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
