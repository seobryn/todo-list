import { signal } from "@preact/signals";
import type { Task } from "../../types/task";
import "./TaskForm.css";
import { useEffect } from "preact/hooks";
import { Text } from "preact-i18n";

interface Props {
  initialTask?: Partial<Task>;
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const title = signal("");
const description = signal("");

export function TaskForm({ initialTask = {}, onSubmit, onCancel }: Props) {
  useEffect(() => {
    title.value = initialTask.title ?? "";
    description.value = initialTask.description ?? "";
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const now = new Date().toISOString();
    onSubmit({
      ...initialTask,
      title: title.value,
      description: description.value,
      createdDate: initialTask.createdDate || now,
      status: initialTask.status || "Todo",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <Text id="taskForm.title">Title:</Text>
        <input
          type="text"
          value={title.value}
          onInput={(e: any) => (title.value = e.target.value)}
          required
        />
      </label>

      <label>
        <Text id="taskForm.description">Description:</Text>
        <textarea
          value={description.value}
          onInput={(e: any) => (description.value = e.target.value)}
        />
      </label>

      <div className="button-group">
        <button type="submit" className="save">
          <Text id="taskForm.save">Save</Text>
        </button>
        <button type="button" className="cancel" onClick={onCancel}>
          <Text id="taskForm.cancel">Cancel</Text>
        </button>
      </div>
    </form>
  );
}
