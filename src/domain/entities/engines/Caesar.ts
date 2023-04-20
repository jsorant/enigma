import { Engine } from "../Engine";

export class CaesarEngine implements Engine {
  public static readonly ENGINE_NAME = "caesar";
  private readonly asciiCharCodeOfA: number = "A".charCodeAt(0);
  private readonly asciiCharCodeOfZ: number = "Z".charCodeAt(0);
  private currentShift: number;
  private readonly increment: number;

  constructor(shift: number, increment: number) {
    this.currentShift = shift;
    this.increment = increment;
  }

  encrypt(message: string): string {
    return this.applyAsciiCharCodeConvertFunctionToEachCharacterOf(
      message,
      this.shiftAsciiCharCode
    );
  }

  decrypt(encryptedMessage: string): string {
    return this.applyAsciiCharCodeConvertFunctionToEachCharacterOf(
      encryptedMessage,
      this.reverseShiftAsciiCharCode
    );
  }

  private applyAsciiCharCodeConvertFunctionToEachCharacterOf(
    aString: string,
    asciiCharCodeConvertFunction: (asciiCharCode: number) => number
  ): string {
    return aString
      .split("")
      .map(this.convertFirstCharacterOfStringToAsciiCharCode)
      .map(asciiCharCodeConvertFunction, this)
      .map(this.convertAsciiCharCodeToString)
      .join("");
  }

  private convertFirstCharacterOfStringToAsciiCharCode(
    character: string
  ): number {
    return character.charCodeAt(0);
  }

  private convertAsciiCharCodeToString(asciiCharCode: number): string {
    return String.fromCharCode(asciiCharCode);
  }

  private shiftAsciiCharCode(asciiCharCode: number): number {
    return this.shiftAsciiCharCodeWithValue(asciiCharCode, this.currentShift);
  }

  private reverseShiftAsciiCharCode(asciiCharCode: number): number {
    return this.shiftAsciiCharCodeWithValue(asciiCharCode, -this.currentShift);
  }

  private shiftAsciiCharCodeWithValue(
    asciiCharCode: number,
    shiftValue: number
  ): number {
    const shiftedAsciiCharCode = asciiCharCode + shiftValue;
    this.updateCurrentShiftWithIncrement();
    return this.cycleAsciiCodeIntoAToZRangeIfNeeded(shiftedAsciiCharCode);
  }

  private updateCurrentShiftWithIncrement() {
    this.currentShift = (this.currentShift + this.increment) % 26;
  }

  private cycleAsciiCodeIntoAToZRangeIfNeeded(asciiCharCode: number): number {
    if (asciiCharCode > this.asciiCharCodeOfZ) {
      const asciiCharCodeInAZRange =
        ((asciiCharCode - this.asciiCharCodeOfA) % 26) + this.asciiCharCodeOfA;
      return asciiCharCodeInAZRange;
    } else if (asciiCharCode < this.asciiCharCodeOfA) {
      const asciiCharCodeInAZRange =
        ((asciiCharCode - this.asciiCharCodeOfA) % 26) +
        this.asciiCharCodeOfZ +
        1;
      return asciiCharCodeInAZRange;
    } else {
      return asciiCharCode;
    }
  }
}
