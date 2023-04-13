import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { SecurityModel } from "../entities/SecurityModel";
import { Engine } from "../entities/Engine";
import { UseCase } from "./UseCase";

export interface DecryptInput {
  modelName: string;
  encryptedMessage: string;
}

export interface DecryptResult {
  decryptedMessage: string;
}

export class Decrypt implements UseCase<DecryptInput, DecryptResult> {
  private readonly repository: SecurityModelRepository;

  constructor(repository: SecurityModelRepository) {
    this.repository = repository;
  }

  async execute(input: DecryptInput): Promise<DecryptResult> {
    const model: SecurityModel | undefined = await this.repository.getByName(
      input.modelName
    );
    if (model === undefined) {
      throw new SecurityModelNotFound(input.modelName);
    }

    let decryptedMessage: string = input.encryptedMessage;
    this.reverseEnginesOrder(model.engines).forEach((engine: Engine) => {
      decryptedMessage = engine.decrypt(decryptedMessage);
    });
    return { decryptedMessage };
  }

  private reverseEnginesOrder(engines: Array<Engine>): Array<Engine> {
    return engines.slice().reverse();
  }
}
