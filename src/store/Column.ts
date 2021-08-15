import { injectable } from "tsyringe";
import { TaskRepository, Typed } from "./interface";
import Task from "./Task";

@injectable()
export default class Column implements TaskRepository<Task[]>, Typed {
  constructor(public _tasks: Task[] = []) {}

  get tasks(): Task[] {
    return this._tasks;
  }

  get type(): string {
    return this.constructor.name;
  }

  from(values: Task[]): void {
    this._tasks = values;
  }

  get(id: string): Task {
    const found = this._tasks.find((t) => t.task_id == id);
    if (!found) throw Error(`task with id ${id} not found`);
    return found;
  }

  insert(task: Task, pos: number): void {
    this._tasks.splice(pos, 0, task);
  }

  add(task: Task): void {
    this._tasks.unshift(task);
  }

  remove(id: string): void {
    this.from(this._tasks.filter((t) => t.task_id != id));
  }
}
