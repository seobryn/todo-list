import { useEffect, useState } from "preact/hooks";
import { Column } from "../Column/Column";
import type { Task, TaskStatus } from "../../types/task";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";
import { TaskForm } from "../TaskForm/TaskForm";
import "./Board.css";
import { Modal } from "../Modal/Modal";

const statuses: TaskStatus[] = ["Todo", "In Progress", "Blocked", "Done"];

export function Board() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("zuno-tasks", []);
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

  const handleCreateOrUpdate = (task: Partial<Task>) => {
    if (task.id) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, ...task, updatedDate: new Date().toISOString() }
            : t
        )
      );
    } else {
      const newTask: Task = {
        status: "Todo",
        id: uuid(),
        title: task.title || "",
        description: task.description || "",
        createdDate: new Date().toISOString(),
        updatedDate: "",
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setEditingTask(task);
  };

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              completionDate:
                newStatus === "Done" ? new Date().toISOString() : undefined,
            }
          : t
      )
    );
  };

  useEffect(() => {
    const handleClick = () => {
      document.querySelectorAll(".context-menu").forEach((menu) => {
        (menu as HTMLElement).style.display = "none";
      });
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="board">
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDropTask={handleDropTask}
        />
      ))}

      <button
        className="fab"
        onClick={() => setEditingTask({})}
        title="Add task"
      >
        +
      </button>

      {editingTask && (
        <Modal onClose={() => setEditingTask(null)}>
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditingTask(null)}
          />
        </Modal>
      )}
    </div>
  );
}
