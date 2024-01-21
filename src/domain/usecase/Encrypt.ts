import { UseCase } from "./shared/UseCase";
import { SecurityModelBasedUseCase } from "./shared/SecurityModelBasedUseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";

export interface EncryptResult {
  encryptedMessage: string;
}

declare namespace Encrypt {
  type EncryptBuilder = typeof Encrypt.EncryptBuilder.prototype;
}

export class Encrypt
  extends SecurityModelBasedUseCase
  implements UseCase<EncryptResult>
{
  readonly #securityModelName: string;
  readonly #messageToEncrypt: string;

  private constructor(builder: Encrypt.EncryptBuilder) {
    super(builder.repository);

    this.#securityModelName = builder.securityModelName;
    this.#messageToEncrypt = builder.messageToEncrypt;
  }

  static builder(): Encrypt.EncryptBuilder {
    return new Encrypt.EncryptBuilder();
  }

  async execute(): Promise<EncryptResult> {
    const securityModel = await this.retrieveSecurityModelOrThrow(
      this.#securityModelName
    );
    const encryptedMessage = securityModel.encrypt(this.#messageToEncrypt);
    return this.formatResult(encryptedMessage);
  }

  private formatResult(encryptedMessage: string): EncryptResult {
    return { encryptedMessage };
  }

  static EncryptBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;
    #securityModelName: string = "";
    #messageToEncrypt: string = "";

    build(): Encrypt {
      return new Encrypt(this);
    }

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): Encrypt.EncryptBuilder {
      this.#repository = repository;
      return this;
    }

    withSecurityModelName(name: string): Encrypt.EncryptBuilder {
      this.#securityModelName = name;
      return this;
    }

    withMessageToEncrypt(message: string): Encrypt.EncryptBuilder {
      this.#messageToEncrypt = message;
      return this;
    }

    get repository(): SecurityModelRepository {
      if (this.#repository === undefined)
        throw new Error("[Encrypt] A SecurityModelRepository must be provided");

      return this.#repository;
    }

    get securityModelName(): string {
      if (this.#securityModelName === "")
        throw new Error("[Encrypt] A security model name must be provided");

      return this.#securityModelName;
    }

    get messageToEncrypt(): string {
      if (this.#messageToEncrypt === "")
        throw new Error("[Encrypt] A message to encrypt must be provided");

      return this.#messageToEncrypt;
    }
  };
}
