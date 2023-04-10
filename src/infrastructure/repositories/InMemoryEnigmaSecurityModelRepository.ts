import { EnigmaSecurityModel } from "../../domain/entities/Enigma";

export class InMemoryEnigmaSecurityModelRepository {
  private readonly map = new Map<string, EnigmaSecurityModel>();

  async save(name: string, model: EnigmaSecurityModel): Promise<void> {
    this.map.set(name, model);
  }

  async get(name: string): Promise<EnigmaSecurityModel | undefined> {
    return this.map.get(name);
  }
}
