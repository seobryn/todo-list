import type { Task } from "../../types/task";
import { formatDate, formatDateTime } from "../../utils/formatter";
import "./TaskCard.css";

// src/components/TaskCard.tsx
interface Props {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: DragEvent, id: string) => void;
  addReminder: (id: string) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onDragStart,
  addReminder,
}: Props) {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    document.querySelectorAll(".context-menu").forEach((menu) => {
      (menu as HTMLElement).style.display = "none";
    });

    const menu = document.getElementById(`menu-${task.id}`);
    if (menu) {
      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;
      menu.style.display = "block";
    }
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onContextMenu={handleContextMenu}
      data-status={task.status}
    >
      <h3>{task.title}</h3>
      <pre>{task.description}</pre>
      <small>Created: {formatDate(task.createdDate)}</small>
      {task.updatedDate && (
        <small className="updated-date">
          Last updated: {formatDateTime(task.updatedDate)}
        </small>
      )}
      {task.completionDate && (
        <small>Completed: {formatDate(task.completionDate)}</small>
      )}

      {/* Contextual Menu */}
      <ul id={`menu-${task.id}`} className="context-menu">
        <li onClick={() => addReminder(task.id)}>🔔 Add Reminder</li>
        <li onClick={() => onEdit(task.id)}>✏️ Edit</li>
        <li onClick={() => onDelete(task.id)}>🗑️ Delete</li>
      </ul>
    </div>
  );
}
