import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";
import { Engine } from "../entities/Engine";
import { UseCase } from "./UseCase";
import { SecurityModelBasedUseCase } from "./SecurityModelBasedUseCase";

export interface EncryptInput {
  modelName: string;
  message: string;
}

export interface EncryptResult {
  encryptedMessage: string;
}

export class Encrypt
  extends SecurityModelBasedUseCase
  implements UseCase<EncryptInput, EncryptResult>
{
  constructor(repository: SecurityModelRepository) {
    super(repository);
  }

  async execute(input: EncryptInput): Promise<EncryptResult> {
    const model: SecurityModel = await this.retrieveSecurityModelOrThrow(
      input.modelName
    );
    const encryptedMessage: string = this.encrypt(input.message, model);
    return { encryptedMessage };
  }

  private encrypt(message: string, model: SecurityModel) {
    let encryptedMessage: string = message;
    model.engines.forEach((engine: Engine) => {
      encryptedMessage = engine.encrypt(encryptedMessage);
    });
    return encryptedMessage;
  }
}
