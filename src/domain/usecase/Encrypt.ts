import { UseCase } from "./shared/UseCase";
import { SecurityModelBasedUseCase } from "./shared/SecurityModelBasedUseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";

export interface EncryptInput {
  securityModelName: string;
  messageToEncrypt: string;
}

export interface EncryptResult {
  encryptedMessage: string;
}

export class Encrypt
  extends SecurityModelBasedUseCase
  implements UseCase<EncryptInput, EncryptResult>
{
  private constructor(repository: SecurityModelRepository) {
    super(repository);
  }

  static buildWithSecurityModelRepository(
    repository: SecurityModelRepository
  ): Encrypt {
    return new Encrypt(repository);
  }

  async execute(input: EncryptInput): Promise<EncryptResult> {
    const securityModel = await this.retrieveSecurityModelOrThrow(
      input.securityModelName
    );
    const encryptedMessage = securityModel.encrypt(input.messageToEncrypt);
    return this.formatResult(encryptedMessage);
  }

  private formatResult(encryptedMessage: string): EncryptResult {
    return { encryptedMessage };
  }
}
