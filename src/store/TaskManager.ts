import axios from "axios";
import { singleton } from "tsyringe";
import ITask from "./interface/ITask";
import Task from "./Task";
import taskStore from "./TaskStore";

@singleton()
export default class TaskManager {
  readonly store = taskStore;

  clearStore(): this {
    Object.keys(this.store).forEach((key) => (this.store[key].tasks = []));
    return this;
  }

  fetchTasks(): void {
    axios
      .get(`./tasks.json`)
      .then((resp) => {
        this.store.all.tasks = resp.data;
      })
      .catch((err: Error) => {
        console.log("There was a problem: " + err.message);
      })
      .finally(() => this.distributeTasks());
  }

  find(taskId: string, column = "all"): ITask | undefined {
    return this.store[column].tasks.find((t) => t.task_id == taskId);
  }

  moveTask(task: ITask, columnId: string, position: number): void {
    const origin = this.store[task.column];

    origin.remove(task.task_id);

    if (task.column != columnId) {
      task.column = columnId;
    } //@TODO: PUT to database
    const target = this.store[columnId];
    target.insert(task, position); //@TODO: PUT to database, reorder?
  }

  addTask(columnId: string): void {
    const target = this.store[columnId];
    const newTask = new Task(columnId);
    target.add(newTask); //@TODO: POST to database
  }

  deleteTask(columnId: string, taskId: string): void {
    const target = this.store[columnId];
    target.remove(taskId);
  }

  private distributeTasks(): void {
    this.store.all.tasks.forEach((t) => {
      this.store[t.column].tasks.push(t);
    });
  }
}