import { ITask } from ".";

export default interface ITaskList {
  insert(task: ITask, index?: number): void;

  add(task: ITask): void;

  remove(id: string): void;
}
