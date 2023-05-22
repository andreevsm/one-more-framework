
export interface ITask {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
}

export type INewTask = Omit<ITask, 'id'>;
