import { SecurityModel } from "../entities/SecurityModel";

export interface SecurityModelRepository {
  save(model: SecurityModel): Promise<void>;
  getByName(name: string): Promise<SecurityModel | undefined>;
}
