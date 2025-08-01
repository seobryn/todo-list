import { create } from "zustand";
import type { Task } from "../types/task";
import { v6 as uuid } from "uuid";

interface TaskState {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  removeTask: (id: string) => void;
}

const savedData = JSON.parse(localStorage.getItem("tasks") || "[]");

export const useStore = create<TaskState>((set) => ({
  tasks: [...(savedData as Task[])],
  addTask: (newTask: Task) => {
    const id = uuid();
    set((state) => {
      localStorage.setItem(
        "tasks",
        JSON.stringify([...state.tasks, { ...newTask, id }])
      );
      return {
        tasks: [...state.tasks, { ...newTask, id, completed: false }],
      };
    });
  },
  editTask: (id, updatedTask: Task) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...updatedTask, id } : task
      );
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return { tasks };
    }),
  removeTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return { tasks: newTasks };
    }),
}));
