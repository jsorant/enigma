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

declare namespace Encrypt {
  type EncryptBuilder = typeof Encrypt.EncryptBuilder.prototype;
}

export class Encrypt
  extends SecurityModelBasedUseCase
  implements UseCase<EncryptInput, EncryptResult>
{
  private constructor(builder: Encrypt.EncryptBuilder) {
    super(builder.repository);
  }

  static builder(): Encrypt.EncryptBuilder {
    return new Encrypt.EncryptBuilder();
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

  static EncryptBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;

    build(): Encrypt {
      return new Encrypt(this);
    }

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): Encrypt.EncryptBuilder {
      this.#repository = repository;
      return this;
    }

    get repository(): SecurityModelRepository {
      if (this.#repository === undefined)
        throw new Error("[Encrypt] A SecurityModelRepository must be provided");

      return this.#repository;
    }
  };
}
