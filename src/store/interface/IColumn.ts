import { ITask, ITaskList, ITaskRepository, IType } from ".";
import { TColumn } from "../types";

export default interface IColumn
  extends ITaskRepository<ITask[]>,
    ITaskList,
    IType<TColumn> {}
