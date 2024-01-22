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

declare namespace Decrypt {
  type DecryptBuilder = typeof Decrypt.DecryptBuilder.prototype;
}

export class Decrypt
  extends SecurityModelBasedUseCase
  implements UseCase<DecryptInput, DecryptResult>
{
  private constructor(builder: Decrypt.DecryptBuilder) {
    super(builder.repository);
  }

  static builder(): Decrypt.DecryptBuilder {
    return new Decrypt.DecryptBuilder();
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

  static DecryptBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): Decrypt.DecryptBuilder {
      this.#repository = repository;
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
  };
}
