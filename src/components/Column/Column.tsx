import { TaskCard } from "../TaskCard/TaskCard";
import type { Task, TaskStatus } from "../../types/task";
import "./Column.css";

interface Props {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
}

export function Column({ status, tasks, onEdit, onDelete, onDropTask }: Props) {
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer?.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  const allowDrop = (e: DragEvent) => e.preventDefault();

  const handleDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer?.setData("text/plain", id);
  };

  return (
    <div
      className="column"
      onDragOver={allowDrop}
      onDrop={handleDrop}
      data-status={status}
    >
      <h2>{status}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
}
