import { singleton } from "tsyringe";
import { TaskRepository } from "./interface";
import Task from "./Task";
import { TaskMap } from "./types";

@singleton()
export default class TaskBase implements TaskRepository<TaskMap> {
  private _tasks: Map<string, Task> = new Map<string, Task>();

  get tasks(): TaskMap {
    return this._tasks;
  }

  add(task: Task): void {
    this._tasks.set(task.task_id, task);
  }

  remove(id: string): void {
    this._tasks.delete(id);
  }

  from(values: Task[]): void {
    this._tasks = new Map(
      values.map((task) => [task.task_id, task] as [string, Task])
    );
  }
  get(id: string): Task {
    const found = this._tasks.get(id);
    if (!found) throw Error("no such task");
    return found;
  }
}
