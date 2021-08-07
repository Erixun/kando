import { container } from "tsyringe";
import { reactive } from "vue";
import TaskList from "./TaskList";

export type IndexedTasks = { [index: string]: TaskList };

export const taskStore: IndexedTasks = {
  all: reactive(container.resolve(TaskList)),
  backlog: reactive(container.resolve(TaskList)),
  upnext: reactive(container.resolve(TaskList)),
  doing: reactive(container.resolve(TaskList)),
  done: reactive(container.resolve(TaskList)),
};

export default taskStore;
