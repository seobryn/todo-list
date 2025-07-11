import { v6 as uuid } from "uuid";
import "./Toaster.css";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

const toastMessages = signal<Array<ToastMessage>>([]);

const Toast = ({ type, message }: ToastProps) => {
  let backgroundColor;
  switch (type) {
    case "success":
      backgroundColor = "#4CAF50"; // Green
      break;
    case "error":
      backgroundColor = "#F44336"; // Red
      break;
    case "warning":
      backgroundColor = "#FF9800"; // Orange
      break;
    default:
      backgroundColor = "#2196F3"; // Blue
  }

  return (
    <div
      className={`toast ${type}`}
      style={{
        backgroundColor,
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{message}</span>
    </div>
  );
};

export const Toaster = () => {
  const addToast = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    duration: number = 2000
  ) => {
    const id = uuid();

    toastMessages.value = [...toastMessages.value, { type, message, id }];

    setTimeout(() => {
      toastMessages.value = toastMessages.value.filter((t) => t.id !== id);
    }, duration);
  };

  useEffect(() => {
    window.addEventListener("toast-success", (event: any) => {
      addToast("success", event.detail);
    });

    window.addEventListener("toast-error", (event: any) => {
      addToast("error", event.detail);
    });

    window.addEventListener("toast-warning", (event: any) => {
      addToast("warning", event.detail);
    });

    window.addEventListener("toast-info", (event: any) => {
      addToast("info", event.detail);
    });

    return () => {
      window.removeEventListener("toast-success", (event: any) => {
        addToast("success", event.detail);
      });

      window.removeEventListener("toast-error", (event: any) => {
        addToast("error", event.detail);
      });

      window.removeEventListener("toast-warning", (event: any) => {
        addToast("warning", event.detail);
      });

      window.removeEventListener("toast-info", (event: any) => {
        addToast("info", event.detail);
      });
    };
  }, []);

  return (
    <div className="toaster">
      {toastMessages.value.map((message) => (
        <Toast key={message.id} type={message.type} message={message.message} />
      ))}
    </div>
  );
};

export default Toaster;
