import { singleton } from "tsyringe";
import { ITask, ITaskRepository } from "./interface";
import { TaskMap } from "./types";

@singleton()
export default class TaskBase implements ITaskRepository<TaskMap> {
  private _tasks: Map<string, ITask> = new Map<string, ITask>();

  get tasks(): TaskMap {
    return this._tasks;
  }

  from(values: ITask[]): void {
    this._tasks = new Map(
      values.map((task) => [task.task_id, task] as [string, ITask])
    );
  }
  get(id: string): ITask {
    const found = this._tasks.get(id);
    if (!found) throw Error("no such task");
    return found;
  }
}
