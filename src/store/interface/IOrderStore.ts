import { ColKey } from "../constant/ColKey";

export default interface IOrderStore {
  [ColKey.Backlog]: string[],
  [ColKey.UpNext]: string[],
  [ColKey.Doing]: string[],
  [ColKey.Done]: string[]
}