import { useState } from "preact/hooks";
import type { Task, TaskStatus } from "../types/task";
import "./TaskForm.css";

interface Props {
  initialTask?: Partial<Task>;
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
}

export function TaskForm({ initialTask = {}, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initialTask.title || "");
  const [description, setDescription] = useState(initialTask.description || "");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const now = new Date().toISOString();
    onSubmit({
      ...initialTask,
      title,
      description,
      createdDate: initialTask.createdDate || now,
      status: initialTask.status || "Todo",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onInput={(e: any) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          value={description}
          onInput={(e: any) => setDescription(e.target.value)}
        />
      </label>

      <div className="button-group">
        <button type="submit" className="save">
          Save
        </button>
        <button type="button" className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
