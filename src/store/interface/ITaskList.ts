import { Task } from "..";

export default interface ITaskList {
  insert(task: Task, index?: number): void;

  add(task: Task): void;

  remove(id: string): void;
}
