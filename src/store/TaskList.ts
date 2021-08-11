import { injectable, singleton } from "tsyringe";
import ITask from "./interface/ITask";
import ITaskList from "./interface/ITaskList";

export type TaskMap = Map<string, ITask>;

export type TaskRepo = TaskMap | ITask[];

export interface ITaskRepository<R extends TaskRepo> {
  readonly tasks: R;
  from(values: ITask[]): void;
  get(id: string): ITask;
}

type TColumn = "Column";
export interface Type<T> {
  readonly type: T;
}

@singleton()
export class TaskBase implements ITaskRepository<TaskMap> {
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

export interface IColumn
  extends ITaskRepository<ITask[]>,
    ITaskList,
    Type<TColumn> {}

@injectable()
export default class Column implements IColumn {
  private _tasks: ITask[];
  private _type: TColumn;

  constructor() {
    this._tasks = [];
    this._type = "Column";
  }

  get tasks(): ITask[] {
    return this._tasks;
  }

  get type(): TColumn {
    return this._type;
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
    this._tasks = this._tasks.filter((t) => t.task_id != id);
  }
}
