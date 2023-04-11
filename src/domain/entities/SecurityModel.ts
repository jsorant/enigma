import { Engine } from "./Engine";

export interface SecurityModel {
  name: string;
  engines: Array<Engine>;
}
