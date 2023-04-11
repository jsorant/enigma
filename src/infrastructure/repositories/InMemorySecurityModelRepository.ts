import { SecurityModelRepository } from "../../domain/ports/SecurityModelRepository";
import { SecurityModel } from "../../domain/entities/SecurityModel";

export class InMemorySecurityModelRepository
  implements SecurityModelRepository
{
  private readonly map = new Map<string, SecurityModel>();

  async save(model: SecurityModel): Promise<void> {
    this.map.set(model.name, model);
  }

  async getByName(name: string): Promise<SecurityModel | undefined> {
    return this.map.get(name);
  }
}
