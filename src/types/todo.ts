export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type Theme = 'purple' | 'blue' | 'green' | 'pink';