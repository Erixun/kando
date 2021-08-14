import { singleton } from "tsyringe";
import { ITask, ITaskRepository } from "./interface";
import Task from "./Task";
import { TaskMap } from "./types";

@singleton()
export default class TaskBase implements ITaskRepository<TaskMap> {
  private _tasks: Map<string, ITask> = new Map<string, ITask>();
  
  get tasks(): TaskMap {
    return this._tasks;
  }
  
  add(task: Task) {
    this._tasks.set(task.task_id, task)
    console.log(this._tasks.get(task.task_id))
  }

  remove(id: string) {
    this._tasks.delete(id)
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
