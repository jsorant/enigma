import { UseCase } from "./shared/UseCase";
import { SecurityModelBasedUseCase } from "./shared/SecurityModelBasedUseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";

export interface DecryptResult {
  decryptedMessage: string;
}

declare namespace Decrypt {
  type DecryptBuilder = typeof Decrypt.DecryptBuilder.prototype;
}

export class Decrypt
  extends SecurityModelBasedUseCase
  implements UseCase<DecryptResult>
{
  readonly #securityModelName: string;
  readonly #messageToDecrypt: string;

  private constructor(builder: Decrypt.DecryptBuilder) {
    super(builder.repository);
    this.#securityModelName = builder.securityModelName;
    this.#messageToDecrypt = builder.messageToDecrypt;
  }

  static builder(): Decrypt.DecryptBuilder {
    return new Decrypt.DecryptBuilder();
  }

  async execute(): Promise<DecryptResult> {
    const securityModel = await this.retrieveSecurityModelOrThrow(
      this.#securityModelName
    );
    const decryptedMessage = securityModel.decrypt(this.#messageToDecrypt);
    return this.formatResult(decryptedMessage);
  }

  private formatResult(decryptedMessage: string): DecryptResult {
    return { decryptedMessage };
  }

  static DecryptBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;
    #securityModelName: string = "";
    #messageToDecrypt: string = "";

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): Decrypt.DecryptBuilder {
      this.#repository = repository;
      return this;
    }

    withSecurityModelName(name: string): Decrypt.DecryptBuilder {
      this.#securityModelName = name;
      return this;
    }

    withMessageToDecrypt(message: string): Decrypt.DecryptBuilder {
      this.#messageToDecrypt = message;
      return this;
    }

    build(): Decrypt {
      return new Decrypt(this);
    }

    get repository(): SecurityModelRepository {
      if (this.#repository === undefined)
        throw new Error("[Decrypt] A SecurityModelRepository must be provided");

      return this.#repository;
    }

    get securityModelName(): string {
      if (this.#securityModelName === "")
        throw new Error("[Decrypt] A security model name must be provided");

      return this.#securityModelName;
    }

    get messageToDecrypt(): string {
      if (this.#messageToDecrypt === "")
        throw new Error("[Decrypt] A message to decrypt must be provided");

      return this.#messageToDecrypt;
    }
  };
}
