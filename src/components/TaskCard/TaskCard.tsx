import { Text } from "preact-i18n";
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
      <small>
        <Text id="task.created">Created: </Text>
        {formatDate(task.createdDate)}
      </small>
      {task.updatedDate && (
        <small className="updated-date">
          <Text id="task.lastUpdated">Last updated: </Text>
          {formatDateTime(task.updatedDate)}
        </small>
      )}
      {task.completionDate && (
        <small>
          <Text id="task.completed">Completed: </Text>
          {formatDate(task.completionDate)}
        </small>
      )}

      {/* Contextual Menu */}
      <ul id={`menu-${task.id}`} className="context-menu">
        <li onClick={() => addReminder(task.id)}>
          🔔 <Text id="contextMenu.addReminder">Add Reminder</Text>
        </li>
        <li onClick={() => onEdit(task.id)}>
          ✏️ <Text id="contextMenu.edit">Edit</Text>
        </li>
        <li onClick={() => onDelete(task.id)}>
          🗑️ <Text id="contextMenu.delete">Delete</Text>
        </li>
      </ul>
    </div>
  );
}
