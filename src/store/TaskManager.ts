import "reflect-metadata";
import axios from "axios";
import { container, singleton } from "tsyringe";
import ITask from "./interface/ITask";
import Task from "./Task";
import TaskStore from "./TaskStore";
import ColString from "./types/ColString";
import IOrderStore from "./interface/IOrderStore";
import OrderStore from "./OrderStore";

@singleton()
export default class TaskManager {
  readonly taskStore = TaskStore;
  readonly orderStore: IOrderStore = container.resolve(OrderStore);

  setup() {
    this.clearStore().fetchTasks()
  }

  private clearStore(): this {
    Object.keys(this.taskStore).forEach((key) => (this.taskStore[key].tasks = []));
    return this;
  }

  private fetchTasks(): void {
    axios
      .get(`./tasks.json`)
      .then((resp) => {
        this.taskStore.all.tasks = resp.data;
      })
      .catch((err: Error) => {
        console.log("There was a problem: " + err.message);
      }).finally(() => this.fetchOrder())
  }

  private fetchOrder(): void {
    axios.get(`./reorder.json`).then(resp => {
      Object.keys(resp.data).forEach(key => {
        this.orderStore[key as ColString] = resp.data[key]
      })
    }).catch((err: Error) => {
      console.log(err.message)
    }).finally(() => this.distributeTasks())
  }

  private distributeTasks() {
    const all = TaskStore.all
    const keys = Object.keys(this.orderStore)
    keys.forEach(columnKey => {
      const ordered = this.orderStore[columnKey as ColString].map(id => all.task(id)!)
      TaskStore[columnKey].tasks = [...ordered]
    })
  }

  reorder(column: ColString, order: string[]) {
    this.orderStore[column] = order
  }

  /**
   * Finds a specific Task in a TaskList and returns it.
   * @param taskId The id of the Task.
   * @param column The column where the task is placed, default "all".
   * @returns Task
   */
  find(taskId: string, column = "all"): ITask | undefined {
    return this.taskStore[column].tasks.find((t) => t.task_id == taskId);
  }

  moveTask(task: ITask, columnId: string, position: number): void {
    const origin = this.taskStore[task.column];

    origin.remove(task.task_id);

    if (task.column != columnId) {
      task.column = columnId;
    } //@TODO: PUT to database
    const target = this.taskStore[columnId];
    target.insert(task, position); //@TODO: PUT to database, reorder?
  }

  addTask(columnId: string): void {
    const target = this.taskStore[columnId];
    const newTask = new Task(columnId);
    target.add(newTask); //@TODO: POST to database w null id, reorder?
  }

  deleteTask(columnId: string, taskId: string): void {
    const target = this.taskStore[columnId];
    target.remove(taskId);
    //@TODO: DELETE to database, reorder?
    axios.delete(`tasks/${taskId}`).then((resp) => {
      console.log("task deleted with response " + resp)
    }).catch((err: Error) => {
      console.log(err.message)
    })
  }
}
