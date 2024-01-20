import { Engine } from "../../Engine";
import { RotorValue } from "./RotorValue";

const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

declare namespace RotorEngine {
  type RotorEngineBuilder = typeof RotorEngine.RotorEngineBuilder.prototype;
}

export class RotorEngine implements Engine {
  public static readonly ENGINE_NAME = "rotor";

  private readonly rotorValue: RotorValue;

  private constructor(builder: RotorEngine.RotorEngineBuilder) {
    this.rotorValue = builder.rotorValue;
  }

  static builder(): RotorEngine.RotorEngineBuilder {
    return new RotorEngine.RotorEngineBuilder();
  }

  encrypt(message: string): string {
    return this.translateEveryCharactersOf(
      message,
      this.translateCharacterFromAlphabetToRotorValue
    );
  }

  decrypt(encryptedMessage: string): string {
    return this.translateEveryCharactersOf(
      encryptedMessage,
      this.translateCharacterFromRotorValueToAlphabet
    );
  }

  private translateEveryCharactersOf(
    message: string,
    translateCharacterFunction: (aString: string) => string
  ): string {
    return message.split("").map(translateCharacterFunction, this).join("");
  }

  private translateCharacterFromRotorValueToAlphabet(
    characterFromMessage: string
  ): string {
    return this.translateCharacter(
      characterFromMessage,
      this.rotorValue.value,
      ALPHABET
    );
  }

  private translateCharacterFromAlphabetToRotorValue(
    characterFromMessage: string
  ): string {
    return this.translateCharacter(
      characterFromMessage,
      ALPHABET,
      this.rotorValue.value
    );
  }

  private translateCharacter(
    character: string,
    sourceString: string,
    destinationString: string
  ): string {
    const indexInSourceString = this.findIndexOfCharacter(
      character,
      sourceString
    );
    const translatedCharacter = destinationString.charAt(indexInSourceString);
    return translatedCharacter;
  }

  private findIndexOfCharacter(
    character: string,
    sourceString: string
  ): number {
    return sourceString.split("").findIndex((element) => element === character);
  }

  static RotorEngineBuilder = class {
    #rotor: RotorValue | undefined = undefined;

    withValue(value: string): RotorEngine.RotorEngineBuilder {
      this.#rotor = new RotorValue(value);
      return this;
    }

    build(): RotorEngine {
      return new RotorEngine(this);
    }

    get rotorValue(): RotorValue {
      if (this.#rotor === undefined) throw new Error("No rotor value provided");

      return this.#rotor;
    }
  };
}
