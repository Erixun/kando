import { container } from "tsyringe";
import { reactive } from "vue";
import Column, {
  IColumn,
  ITaskRepository,
  TaskBase,
  TaskMap,
} from "./TaskList";

export const all = Symbol("key for main repository of tasks");

export type IndexedTasks = {
  readonly [index: string]: IColumn;
  readonly [all]: ITaskRepository<TaskMap>;
};

export const TaskStore: IndexedTasks = {
  [all]: reactive(container.resolve(TaskBase)),
  backlog: reactive(container.resolve(Column)),
  upnext: reactive(container.resolve(Column)),
  doing: reactive(container.resolve(Column)),
  done: reactive(container.resolve(Column)),
};

export default TaskStore;
