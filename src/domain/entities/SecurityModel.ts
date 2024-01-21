import { Engine } from "./engines/Engine";
import { CaesarEngine } from "./engines/caesar/CaesarEngine";
import { RotorEngine } from "./engines/rotor/RotorEngine";

declare namespace SecurityModel {
  type SecurityModelBuilder =
    typeof SecurityModel.SecurityModelBuilder.prototype;
}

export class SecurityModel {
  public readonly name: string;
  readonly #engines: Array<Engine>;

  private constructor(builder: SecurityModel.SecurityModelBuilder) {
    this.name = builder.name;
    this.#engines = builder.engines;
  }

  static builder(): SecurityModel.SecurityModelBuilder {
    return new SecurityModel.SecurityModelBuilder();
  }

  encrypt(message: string): string {
    const encryptedMessage = this.useEveryEngineToEncrypt(message);
    return encryptedMessage;
  }

  decrypt(encryptedMessage: string): string {
    const decryptedMessage = this.useEveryEngineToDecrypt(encryptedMessage);
    return decryptedMessage;
  }

  private useEveryEngineToEncrypt(message: string) {
    let encryptedMessage: string = message;
    this.#engines.forEach((engine: Engine) => {
      encryptedMessage = engine.encrypt(encryptedMessage);
    });
    return encryptedMessage;
  }

  private useEveryEngineToDecrypt(encryptedMessage: string) {
    let decryptedMessage: string = encryptedMessage;
    const reversedEngines = this.reverseEnginesOrder();
    reversedEngines.forEach((engine: Engine) => {
      decryptedMessage = engine.decrypt(decryptedMessage);
    });
    return decryptedMessage;
  }

  private reverseEnginesOrder(): Array<Engine> {
    return [...this.#engines].reverse();
  }

  static SecurityModelBuilder = class {
    #name: string = "";
    #engines: Array<Engine> = [];

    build(): SecurityModel {
      return new SecurityModel(this);
    }

    withName(name: string): SecurityModel.SecurityModelBuilder {
      this.#name = name;
      return this;
    }

    withCaesar(
      shift: number,
      increment: number
    ): SecurityModel.SecurityModelBuilder {
      this.#engines.push(
        CaesarEngine.builder().withShift(shift).withIncrement(increment).build()
      );
      return this;
    }

    withRotor(value: string): SecurityModel.SecurityModelBuilder {
      this.#engines.push(RotorEngine.builder().withValue(value).build());
      return this;
    }

    get name(): string {
      if (this.#name === "")
        throw new Error("[SecurityModel] A name must be provided");

      return this.#name;
    }

    get engines(): Array<Engine> {
      if (this.#engines.length === 0)
        throw new Error("[SecurityModel] At least one engine must be provided");

      return this.#engines;
    }
  };
}
