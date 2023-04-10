export class Rotor {
  private readonly alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly rotorValue: string;

  constructor(rotor: string) {
    this.rotorValue = rotor;
  }

  encrypt(message: string): string {
    return message
      .split("")
      .map((characterFromMessage) =>
        this.applyRotorOnCharacter(characterFromMessage)
      )
      .join("");
  }

  private applyRotorOnCharacter(character: string) {
    const alphabetIndex = this.alphabet
      .split("")
      .findIndex((element) => element === character);

    return this.rotorValue.charAt(alphabetIndex);
  }
}
