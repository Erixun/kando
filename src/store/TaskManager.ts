import "reflect-metadata";
import axios from "axios";
import { container, singleton } from "tsyringe";
import ITask from "./interface/ITask";
import Task from "./Task";
import TaskStore, { all } from "./TaskStore";
import IOrderStore from "./interface/IOrderStore";
import OrderStore from "./OrderStore";
import ColString from "./types/ColString";

@singleton()
export default class TaskManager {
  readonly taskStore = TaskStore;
  readonly orderStore: IOrderStore = container.resolve(OrderStore);

  setup(): void {
    this.clearStore().fetchTasks();
  }

  private clearStore(): this {
    Object.keys(this.taskStore).forEach((key) => {
      const container = this.taskStore[key];
      if (container.type === "Column") container.from([]);
    });
    return this;
  }

  private fetchTasks(): void {
    axios
      .get(`./tasks.json`)
      .then((resp) => {
        this.taskStore[all].from(resp.data);
      })
      .catch((err: Error) => {
        console.log("There was a problem: " + err.message);
      })
      .finally(() => this.fetchOrder());
  }

  private fetchOrder(): void {
    axios
      .get(`./reorder.json`)
      .then((resp) => {
        Object.keys(resp.data).forEach((key) => {
          this.orderStore[key as ColString] = resp.data[key];
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
      .finally(() => this.distributeTasks());
  }

  private distributeTasks() {
    const allTasks = TaskStore[all];
    const keys = Object.keys(this.orderStore);
    keys.forEach((columnKey) => {
      const ordered = this.orderStore[columnKey as ColString].map((id) =>
        allTasks.get(id)
      );
      TaskStore[columnKey].from(ordered);
    });
  }

  /**
   * Updates task order whenever order of tasks changes in column(s).
   * @param column The column in which the task is placed.
   * @param order The new order of tasks within the column.
   */
  reorder(column: ColString, order: string[]): void {
    const hasChanged =
      JSON.stringify(this.orderStore[column]) != JSON.stringify(order);
    if (hasChanged) {
      this.orderStore[column] = order;
      // axios.put('./reorder.json', this.orderStore[column])
    }
  }

  /**
   * Finds a specific Task in a TaskList and returns it.
   * @param taskId The id of the Task.
   * @param column The column where the task is placed, default "all".
   * @returns Task
   */
  find(taskId: string, column?: string): ITask | undefined {
    return this.taskStore[column ?? all].get(taskId);
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
    // axios
    //   .delete(`tasks/${taskId}`)
    //   .then((resp) => {
    //     console.log("task deleted with response " + resp);
    //   })
    //   .catch((err: Error) => {
    //     console.log(err.message);
    //   });
  }
}
