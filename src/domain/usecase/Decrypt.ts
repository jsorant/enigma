import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";
import { Engine } from "../entities/Engine";
import { UseCase } from "./UseCase";
import { SecurityModelBasedUseCase } from "./SecurityModelBasedUseCase";

export interface DecryptInput {
  modelName: string;
  encryptedMessage: string;
}

export interface DecryptResult {
  decryptedMessage: string;
}

export class Decrypt
  extends SecurityModelBasedUseCase
  implements UseCase<DecryptInput, DecryptResult>
{
  constructor(repository: SecurityModelRepository) {
    super(repository);
  }

  async execute(input: DecryptInput): Promise<DecryptResult> {
    const model: SecurityModel = await this.retrieveSecurityModelOrThrow(
      input.modelName
    );
    const decryptedMessage: string = this.decrypt(
      input.encryptedMessage,
      model
    );
    return { decryptedMessage };
  }

  private decrypt(encryptedMessage: string, model: SecurityModel) {
    let decryptedMessage: string = encryptedMessage;
    this.reverseEnginesOrder(model.engines).forEach((engine: Engine) => {
      decryptedMessage = engine.decrypt(decryptedMessage);
    });
    return decryptedMessage;
  }

  private reverseEnginesOrder(engines: Array<Engine>): Array<Engine> {
    return engines.slice().reverse();
  }
}
