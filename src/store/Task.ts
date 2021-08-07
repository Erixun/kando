import ITask from "./interface/ITask";

export default class Task implements ITask {
  task_id: string;
  name: string;
  column: string;

  constructor(column:  string) {
    this.task_id = "new";
    this.name = ""
    this.column = column
  }
}