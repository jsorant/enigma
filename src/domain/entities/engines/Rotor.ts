import { Engine } from "../Engine";

export class RotorEngine implements Engine {
  public static readonly ENGINE_NAME = "rotor";
  private readonly alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly rotorValue: string;

  constructor(rotor: string) {
    this.rotorValue = rotor;
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
      this.rotorValue,
      this.alphabet
    );
  }

  private translateCharacterFromAlphabetToRotorValue(
    characterFromMessage: string
  ): string {
    return this.translateCharacter(
      characterFromMessage,
      this.alphabet,
      this.rotorValue
    );
  }

  private translateCharacter(
    character: string,
    sourceString: string,
    destinationString: string
  ) {
    const indexInSourceString = this.findIndexOfCharacter(
      character,
      sourceString
    );
    const translatedCharacter = destinationString.charAt(indexInSourceString);
    return translatedCharacter;
  }

  private findIndexOfCharacter(character: string, sourceString: string) {
    return sourceString.split("").findIndex((element) => element === character);
  }
}
