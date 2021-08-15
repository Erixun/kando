import { container } from "tsyringe";
import { reactive } from "vue";
import All from "./constant/All";
import { TaskRepository } from "./interface";
import Column from "./Column";
import { TaskMap } from "./types";
import { TaskBase } from ".";
import { ColKey } from "./constant";

export type IndexedTasks = Record<ColKey, Column> & {
  readonly [All]: TaskRepository<TaskMap>;
};

export const TaskStore: IndexedTasks = {
  [All]: reactive(container.resolve(TaskBase)),
  backlog: reactive(container.resolve(Column)),
  upnext: reactive(container.resolve(Column)),
  doing: reactive(container.resolve(Column)),
  done: reactive(container.resolve(Column)),
};

export default TaskStore;
