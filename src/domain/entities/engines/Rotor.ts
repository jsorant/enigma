import { Engine } from "../Engine";

export class RotorEngine implements Engine {
  public static readonly ENGINE_NAME = "rotor";
  private readonly alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly rotorValue: string;

  constructor(rotor: string) {
    this.rotorValue = rotor;
  }

  encrypt(message: string): string {
    return this.translateEveryCharactersFromAlphabetToRotorValue(message);
  }

  decrypt(encryptedMessage: string): string {
    return this.translateEveryCharactersFromRotorValueToAlphabet(
      encryptedMessage
    );
  }

  private translateEveryCharactersFromAlphabetToRotorValue(
    message: string
  ): string {
    return message
      .split("")
      .map((characterFromMessage) =>
        this.translateCharacterFromAlphabetToRotorValue(characterFromMessage)
      )
      .join("");
  }

  private translateEveryCharactersFromRotorValueToAlphabet(
    encryptedMessage: string
  ): string {
    return encryptedMessage
      .split("")
      .map((characterFromMessage) =>
        this.translateCharacterFromRotorValueToAlphabet(characterFromMessage)
      )
      .join("");
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
