import { Task } from "..";
import { TaskMap } from "../types";

export default interface TaskRepository<R extends TaskMap | Task[]> {
  readonly tasks: R;
  from(values: Task[]): void;
  get(id: string): Task;
  add(task: Task): void;
  remove(id: string): void;
}
