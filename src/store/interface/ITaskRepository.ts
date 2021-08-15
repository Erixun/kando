import { Task } from "..";
import { TaskRepo } from "../types";

export default interface ITaskRepository<R extends TaskRepo> {
  readonly tasks: R;
  from(values: Task[]): void;
  get(id: string): Task;
  add(task: Task): void;
  remove(id: string): void;
}
