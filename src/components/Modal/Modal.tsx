import "./Modal.css";
import { useModalStore } from "../../store/ModalStore";

interface Props {
  children: preact.ComponentChildren;
  onClose: () => void;
}

export function Modal({ children, onClose }: Props) {
  const { closing, handleClose } = useModalStore();

  return (
    <div className="modal-overlay" onClick={() => handleClose(onClose)}>
      <div
        className={`modal-content ${closing ? "fade-out" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={() => handleClose(onClose)}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
