export type Priority = 'Low' | 'Medium' | 'High';

export type FilterType = 'all' | 'today' | 'pending' | 'completed' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string; // Format: YYYY-MM-DD
  completed: boolean;
  createdAt: string; // ISO string or YYYY-MM-DD
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}
