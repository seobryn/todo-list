import { useState } from "preact/hooks";
import "./Modal.css";

interface Props {
  children: preact.ComponentChildren;
  onClose: () => void;
}

export function Modal({ children, onClose }: Props) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300); // match animation duration
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${closing ? "fade-out" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
