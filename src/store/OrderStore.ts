import { singleton } from "tsyringe";
import { ColKey } from "./constant";
@singleton()
export default class OrderStore
  implements Record<ColKey, string[]>
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
