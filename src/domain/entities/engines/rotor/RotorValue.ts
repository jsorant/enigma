const ROTOR_VALUE_LENGTH = 26;

export class RotorValue {
  public readonly value: string;

  constructor(value: string) {
    this.ensureLengthIs26(value);
    this.ensureHasOnlyCharactersInAZRange(value);
    this.ensureHasNoDuplicateCharacters(value);

    this.value = value;
  }

  private ensureHasNoDuplicateCharacters(value: string) {
    if (new Set([...value.split("")]).size !== value.length)
      throw new Error("Rotor value cannot have duplicated letters");
  }

  private ensureHasOnlyCharactersInAZRange(value: string) {
    if (value.search("[^A-Z]") !== -1)
      throw new Error("Rotor value must only include characters in A-Z range");
  }

  private ensureLengthIs26(value: string) {
    if (value.length !== ROTOR_VALUE_LENGTH)
      throw new Error("Rotor value length must be 26 letters");
  }
}
