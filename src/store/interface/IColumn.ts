import { ITaskList, ITaskRepository, IType } from ".";
import { Task } from "..";
import { TColumn } from "../types";

export default interface IColumn
  extends ITaskRepository<Task[]>,
    ITaskList,
    IType<TColumn> {}
