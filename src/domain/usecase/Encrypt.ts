import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { SecurityModel } from "../entities/SecurityModel";
import { Engine } from "../entities/Engine";
import { UseCase } from "./UseCase";

export interface EncryptInput {
  modelName: string;
  message: string;
}

export interface EncryptResult {
  encryptedMessage: string;
}

export class Encrypt implements UseCase<EncryptInput, EncryptResult> {
  private readonly repository: SecurityModelRepository;

  constructor(repository: SecurityModelRepository) {
    this.repository = repository;
  }

  async execute(input: EncryptInput): Promise<EncryptResult> {
    const model: SecurityModel | undefined = await this.repository.getByName(
      input.modelName
    );
    if (model === undefined) {
      throw new SecurityModelNotFound(input.modelName);
    }

    let encryptedMessage: string = input.message;
    model.engines.forEach((engine: Engine) => {
      encryptedMessage = engine.encrypt(encryptedMessage);
    });
    return { encryptedMessage };
  }
}
