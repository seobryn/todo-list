import { create } from "zustand";
import type { Task } from "../types/task";
import { v6 as uuid } from "uuid";

interface TaskState {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  removeTask: (id: string) => void;
}

export const useStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: uuid(), completed: false }],
    })),
  editTask: (id, newTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...newTask } : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
