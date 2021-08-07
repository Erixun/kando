import { injectable } from "tsyringe";
import ITask from "./interface/ITask";
import ITaskList from "./interface/ITaskList";

@injectable()
export default class TaskList implements ITaskList {
  tasks: ITask[] = [];

  insert(task: ITask, pos?: number): void {
    pos ? this.tasks.splice(pos > 0 ? pos - 1 : 0, 0, task) : this.tasks.push(task);
  }

  remove(id: string): void {
    this.tasks = this.tasks.filter((t) => t.task_id != id);
  }
}
