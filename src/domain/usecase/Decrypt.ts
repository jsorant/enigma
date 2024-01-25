import { UseCase } from "./shared/UseCase";
import { SecurityModelBasedUseCase } from "./shared/SecurityModelBasedUseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";

export interface DecryptInput {
  securityModelName: string;
  messageToDecrypt: string;
}

export interface DecryptResult {
  decryptedMessage: string;
}

export class Decrypt
  extends SecurityModelBasedUseCase
  implements UseCase<DecryptInput, DecryptResult>
{
  private constructor(repository: SecurityModelRepository) {
    super(repository);
  }

  static buildWithSecurityModelRepository(
    repository: SecurityModelRepository
  ): Decrypt {
    return new Decrypt(repository);
  }

  async execute(input: DecryptInput): Promise<DecryptResult> {
    const securityModel = await this.retrieveSecurityModelOrThrow(
      input.securityModelName
    );
    const decryptedMessage = securityModel.decrypt(input.messageToDecrypt);
    return this.formatResult(decryptedMessage);
  }

  private formatResult(decryptedMessage: string): DecryptResult {
    return { decryptedMessage };
  }
}
