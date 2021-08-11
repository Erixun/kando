import "reflect-metadata";
import axios from "axios";
import { container, singleton } from "tsyringe";
import ITask from "./interface/ITask";
import Task from "./Task";
import TaskStore from "./TaskStore";
import OrderStore from "./OrderStore";
import ColString from "./types/ColString";
import all from "./constant/All";

@singleton()
export default class TaskManager {
  readonly taskStore = TaskStore;
  readonly orderStore = container.resolve(OrderStore);

  setup(): void {
    this.clearStore().fetchTasks();
  }

  private clearStore(): this {
    Object.keys(this.taskStore).forEach((key) => {
      const container = this.taskStore[key as ColString];
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
      TaskStore[columnKey as ColString].from(ordered);
    });
  }

  /**
   * Updates task order whenever order of tasks changes in column(s).
   * @param column The column in which the task is placed.
   * @param order The new order of tasks within the column.
   */
  reorder(column: string, order: string[]): void {
    const hasChanged =
      JSON.stringify(this.orderStore[column as ColString]) !=
      JSON.stringify(order);
    if (hasChanged) {
      this.orderStore[column as ColString] = order;
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
    return this.taskStore[(column as ColString) ?? all].get(taskId);
  }

  moveTask(task: ITask, columnId: string, position: number): void {
    const origin = this.taskStore[task.column as ColString];

    origin.remove(task.task_id);

    if (task.column != columnId) {
      task.column = columnId as ColString;
    } //@TODO: PUT to database
    const target = this.taskStore[columnId as ColString];
    target.insert(task, position); //@TODO: PUT to database, reorder?
  }

  addTask(columnId: string): void {
    const target = this.taskStore[columnId as ColString];
    const newTask = new Task(columnId as ColString);
    target.add(newTask); //@TODO: POST to database w null id, reorder?
  }

  deleteTask(columnId: string, taskId: string): void {
    const target = this.taskStore[columnId as ColString];
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
