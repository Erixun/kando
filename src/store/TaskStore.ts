import "reflect-metadata";
import { container } from "tsyringe";
import { reactive } from "vue";
import All from "./constant/All";
import { ITaskRepository } from "./interface";
import Column from "./Column";
import { TaskMap } from "./types";
import TColIndex from "./types/TColIndex";
import { TaskBase } from ".";

export type IndexedTasks = TColIndex<Column> & {
  readonly [All]: ITaskRepository<TaskMap>;
};

export const TaskStore: IndexedTasks = {
  [All]: reactive(container.resolve(TaskBase)),
  backlog: reactive(container.resolve(Column)),
  upnext: reactive(container.resolve(Column)),
  doing: reactive(container.resolve(Column)),
  done: reactive(container.resolve(Column)),
};

export default TaskStore;
