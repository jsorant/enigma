import { EnigmaSecurityModel } from "../entities/Enigma";

export interface EnigmaSecurityModelRepository {
  save(name: string, model: EnigmaSecurityModel): Promise<void>;
  get(name: string): Promise<EnigmaSecurityModel | undefined>;
}
