import ITask from "./interface/ITask";
import { ColString } from "./types";

export default class Task implements ITask {
  task_id: string;
  name: string;
  column: ColString;

  constructor(column: ColString) {
    this.task_id = "new";
    this.name = "";
    this.column = column;
  }
}
