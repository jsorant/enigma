import { EnigmaSecurityModelRepository } from "../ports/EnigmaSecurityModelRepository";
import { Enigma, EnigmaSecurityModel } from "../entities/Enigma";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";

export class EncryptWithEnigma {
  private readonly repository: EnigmaSecurityModelRepository;

  constructor(repository: EnigmaSecurityModelRepository) {
    this.repository = repository;
  }

  async execute(modelName: string, message: string): Promise<string> {
    const model: EnigmaSecurityModel | undefined = await this.repository.get(
      modelName
    );
    if (model === undefined) {
      throw new SecurityModelNotFound(modelName);
    }
    const enigma = new Enigma(message, model);
    return enigma.encrypt();
  }
}
