import { ColKey } from "./constant";

export default class Task {
  task_id: string;
  name: string;
  column: ColKey;
  at: string; //@TODO: make TimeString type
  til: string;

  constructor(column: ColKey) {
    this.task_id = "new";
    this.name = "";
    this.column = column;
    this.at = "";
    this.til = "";
  }
}
