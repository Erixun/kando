import { ITask } from ".";
import { TaskRepo } from "../types";

export default interface ITaskRepository<R extends TaskRepo> {
  readonly tasks: R;
  from(values: ITask[]): void;
  get(id: string): ITask;
}
