import { singleton } from "tsyringe";
import { ColKey } from "./constant";
import IOrderStore from "./interface/IOrderStore";
import ColString from "./types/ColString";

@singleton()
export default class OrderStore
  implements Record<ColString, string[]>, IOrderStore
{
  [ColKey.Backlog]: string[];
  [ColKey.UpNext]: string[];
  [ColKey.Doing]: string[];
  [ColKey.Done]: string[];

  constructor() {
    this.backlog = [];
    this.upnext = [];
    this.doing = [];
    this.done = [];
  }
}
