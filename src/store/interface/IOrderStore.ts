import { ColKey } from "../constant";

export default interface IOrderStore {
  [ColKey.Backlog]: string[];
  [ColKey.UpNext]: string[];
  [ColKey.Doing]: string[];
  [ColKey.Done]: string[];
}
