import { ColString } from ".";
import { Column } from "..";

type TColIndex<T extends string[] | Column> = {
  [index in ColString]: T;
};

export default TColIndex;
