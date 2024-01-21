import { Shift } from "./Shift";

const ALPHABET_LENGTH = 26;
const A_CHAR_CODE = "A".charCodeAt(0);
const Z_CHAR_CODE = "Z".charCodeAt(0);

export class Letter {
  public readonly value: string;

  private constructor(value: string) {
    this.ensureIsNotEmpty(value);
    this.ensureLengthIsOne(value);
    this.ensureIsInAZRange(value);

    this.value = value;
  }

  static withValue(value: string) {
    return new Letter(value);
  }

  shift(shift: Shift): Letter {
    return this.applyShift(shift.value);
  }

  reverse(shift: Shift): Letter {
    return this.applyShift(-shift.value);
  }

  private applyShift(shiftValue: number): Letter {
    let shiftedCharCode = this.charCode() + shiftValue;
    shiftedCharCode = this.moveInAZRangeIfNeeded(shiftedCharCode);
    return new Letter(String.fromCharCode(shiftedCharCode));
  }

  private moveInAZRangeIfNeeded(charCode: number): number {
    let result = charCode;
    while (result > Z_CHAR_CODE) result -= ALPHABET_LENGTH;
    while (result < A_CHAR_CODE) result += ALPHABET_LENGTH;
    return result;
  }

  private charCode(): number {
    return this.value.charCodeAt(0);
  }

  private ensureIsInAZRange(value: string): void {
    if (value.search("[^A-Z]") !== -1)
      throw new Error("Letter must be in A-Z range");
  }

  private ensureLengthIsOne(value: string): void {
    if (value.length > 1) throw new Error("Letter must be 1 letter long");
  }

  private ensureIsNotEmpty(value: string): void {
    if (value === "") throw new Error("Letter cannot be empty");
  }
}
