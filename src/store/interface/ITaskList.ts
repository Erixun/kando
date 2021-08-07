import ITask from "./ITask";

export default interface ITaskList {
  tasks: ITask[];

  insert(task: ITask, index?: number): void;

  remove(id: string): void;
}
