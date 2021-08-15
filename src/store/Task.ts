import { ColKey } from "./constant";

export default class Task {
  task_id: string;
  name: string;
  column: ColKey;

  constructor(column: ColKey) {
    this.task_id = "new";
    this.name = "";
    this.column = column;
  }
}
