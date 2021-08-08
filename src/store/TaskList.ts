import { injectable } from "tsyringe";
import ITask from "./interface/ITask";
import ITaskList from "./interface/ITaskList";

@injectable()
export default class TaskList implements ITaskList {
  tasks: ITask[] = [];

  task(id: string): ITask | undefined {
    const found = this.tasks.find(t => t.task_id == id)
    return found
  }

  insert(task: ITask, pos: number): void {
    this.tasks.splice(pos, 0, task);
  }

  add(task: ITask): void {
    this.tasks.unshift(task);
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter((t) => t.task_id != id);
  }
}
