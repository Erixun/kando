import { Task } from "..";
import TaskMap from "./TaskMap";

type TaskRepo = TaskMap | Task[];

export default TaskRepo;
