import ITask from "../interface/ITask";
import TaskMap from "./TaskMap";

type TaskRepo = TaskMap | ITask[];

export default TaskRepo;
