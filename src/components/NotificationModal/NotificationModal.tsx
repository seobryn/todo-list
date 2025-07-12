import { useState } from "preact/hooks";
import { Modal } from "../Modal/Modal";
import "./NotificationModal.css";

interface Props {
  taskTitle: string;
  onClose: () => void;
  onSchedule: (date: Date) => void;
}

export function NotificationModal({ taskTitle, onClose, onSchedule }: Props) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const currDate = new Date();
    return currDate.toISOString().slice(0, 16);
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const notificationDate = new Date(selectedDate);

    if (notificationDate <= new Date()) {
      alert("Please select a future date and time");
      return;
    }

    onSchedule(notificationDate);
    onClose();
  };

  const minDateTime = new Date();
  minDateTime.setMinutes(minDateTime.getMinutes() + 1);

  return (
    <Modal onClose={onClose}>
      <div className="notification-modal">
        <h3>Set Reminder</h3>
        <p>
          Set a notification for: <strong>{taskTitle}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="notification-time">Notify me on:</label>
            <input
              id="notification-time"
              type="datetime-local"
              value={selectedDate}
              min={minDateTime.toISOString()}
              onChange={(e) =>
                setSelectedDate((e.target as HTMLInputElement).value)
              }
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Schedule Reminder
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
