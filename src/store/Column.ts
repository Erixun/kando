import { injectable } from "tsyringe";
import { IColumn, ITask } from "./interface";
import { TColumn } from "./types";

@injectable()
export default class Column implements IColumn {
  static readonly _type: TColumn = "Column";
  
  constructor(public _tasks: ITask[] = []) {}

  get tasks(): ITask[] {
    return this._tasks;
  }

  get type(): TColumn {
    return Column._type;
  }

  from(values: ITask[]): void {
    this._tasks = values;
  }

  get(id: string): ITask {
    const found = this._tasks.find((t) => t.task_id == id);
    if (!found) throw Error(`task with id ${id} not found`);
    return found;
  }

  insert(task: ITask, pos: number): void {
    this._tasks.splice(pos, 0, task);
  }

  add(task: ITask): void {
    this._tasks.unshift(task);
  }

  remove(id: string): void {
    this.from(this._tasks.filter((t) => t.task_id != id));
  }
}
