import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModelNotFound } from "./errors/SecurityModelNotFound";
import { SecurityModel } from "../entities/SecurityModel";
import { Engine } from "../entities/Engine";

export class Encrypt {
  private readonly repository: SecurityModelRepository;

  constructor(repository: SecurityModelRepository) {
    this.repository = repository;
  }

  async execute(modelName: string, message: string): Promise<string> {
    const model: SecurityModel | undefined = await this.repository.getByName(
      modelName
    );
    if (model === undefined) {
      throw new SecurityModelNotFound(modelName);
    }

    let encryptedMessage: string = message;
    model.engines.forEach((engine: Engine) => {
      encryptedMessage = engine.encrypt(encryptedMessage);
    });
    return encryptedMessage;
  }
}
