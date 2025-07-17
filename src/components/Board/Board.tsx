import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { Column } from "../Column/Column";
import type { Task, TaskStatus } from "../../types/task";
import { useStore } from "../../store/taskStore";
import { v6 as uuid } from "uuid";
import { TaskForm } from "../TaskForm/TaskForm";
import "./Board.css";
import { Modal } from "../Modal/Modal";
import { NotificationModal } from "../NotificationModal/NotificationModal";
import { TASK_CREATED, TASK_DELETED, TASK_UPDATED } from "../../constants";
import { scheduleNotification } from "../../utils/notifications";

const statuses: TaskStatus[] = ["Todo", "In Progress", "Blocked", "Done"];

const editingTaskSignal = signal<Partial<Task> | null>(null);
const reminderTaskSignal = signal<{ id: string; title: string } | null>(null);

export function Board() {
  const { tasks, addTask, editTask, removeTask } = useStore();
  const handleCreateOrUpdate = (task: Partial<Task>) => {
    if (task.id) {
      editTask(task.id!, {
        ...(task as Task),
        updatedDate: new Date().toISOString(),
      });
      window.dispatchEvent(
        new CustomEvent("toast-success", {
          detail: TASK_UPDATED,
          bubbles: false,
          cancelable: true,
          composed: false,
        })
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
      addTask(newTask);
      window.dispatchEvent(
        new CustomEvent("toast-success", {
          detail: TASK_CREATED,
          bubbles: false,
          cancelable: true,
          composed: false,
        })
      );
    }
    editingTaskSignal.value = null;
  };

  const handleDelete = (id: string) => {
    removeTask(id);
    window.dispatchEvent(
      new CustomEvent("toast-success", {
        detail: TASK_DELETED,
        bubbles: false,
        cancelable: true,
        composed: false,
      })
    );
  };

  const handleEdit = (id: string) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) editingTaskSignal.value = task;
  };

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    editTask(taskId, {
      ...(tasks.find((t: Task) => t.id === taskId) as Task),
      status: newStatus,
      completionDate:
        newStatus === "Done" ? new Date().toISOString() : undefined,
    });
  };

  const addReminder = (taskId: string) => {
    const task = tasks.find((t: Task) => t.id === taskId);
    if (task) {
      reminderTaskSignal.value = { id: task.id, title: task.title };
    }
  };

  const handleScheduleNotification = (date: Date) => {
    const reminderTask = reminderTaskSignal.value;
    if (reminderTask) {
      const task = tasks.find((t: Task) => t.id === reminderTask.id);
      if (task) {
        scheduleNotification(
          task.title,
          {
            body: task.description,
            icon: "/todo-list/192x192.png",
          },
          date
        );
        window.dispatchEvent(
          new CustomEvent("toast-success", {
            detail: `Reminder set for ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`,
            bubbles: false,
            cancelable: true,
            composed: false,
          })
        );
      }
    }
    reminderTaskSignal.value = null;
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
          tasks={tasks.filter((t: Task) => t.status === status)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addReminder={addReminder}
          onDropTask={handleDropTask}
        />
      ))}

      <button
        className="fab"
        onClick={() => (editingTaskSignal.value = {})}
        title="Add task"
      >
        +
      </button>

      {editingTaskSignal.value && (
        <Modal onClose={() => (editingTaskSignal.value = null)}>
          <TaskForm
            initialTask={editingTaskSignal.value}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => (editingTaskSignal.value = null)}
          />
        </Modal>
      )}

      {reminderTaskSignal.value && (
        <NotificationModal
          taskTitle={reminderTaskSignal.value.title}
          onClose={() => (reminderTaskSignal.value = null)}
          onSchedule={handleScheduleNotification}
        />
      )}
    </div>
  );
}
