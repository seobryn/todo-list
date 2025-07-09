export type TaskStatus = "Todo" | "In Progress" | "Blocked" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  updatedDate?: string;
  completionDate?: string;
  status: TaskStatus;
}
