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
    return message
      .split("")
      .map((character) => character.charCodeAt(0))
      .map((asciiCharCode) => this.shift(asciiCharCode))
      .map((asciiCharCode) => String.fromCharCode(asciiCharCode))
      .join("");
  }

  decrypt(encryptedMessage: string): string {
    return encryptedMessage
      .split("")
      .map((character) => character.charCodeAt(0))
      .map((asciiCharCode) => this.reverseShift(asciiCharCode))
      .map((asciiCharCode) => String.fromCharCode(asciiCharCode))
      .join("");
  }

  private shift(asciiCharCode: number): number {
    const shiftedAsciiCharCode = asciiCharCode + this.currentShift;
    this.updateShiftWithIncrement();
    return this.cycleAsciiCodeIntoAToZRangeIfNeeded(shiftedAsciiCharCode);
  }

  private reverseShift(asciiCharCode: number): number {
    const shiftedAsciiCharCode = asciiCharCode - this.currentShift;
    this.updateShiftWithIncrement();
    return this.cycleAsciiCodeIntoAToZRangeIfNeeded(shiftedAsciiCharCode);
  }

  private updateShiftWithIncrement() {
    this.currentShift = (this.currentShift + this.increment) % 26;
  }

  private cycleAsciiCodeIntoAToZRangeIfNeeded(asciiCharCode: number): number {
    if (asciiCharCode > this.asciiCharCodeOfZ) {
      const newValue =
        ((asciiCharCode - this.asciiCharCodeOfA) % 26) + this.asciiCharCodeOfA;
      return newValue;
    } else if (asciiCharCode < this.asciiCharCodeOfA) {
      const newValue =
        ((asciiCharCode - this.asciiCharCodeOfA) % 26) +
        this.asciiCharCodeOfZ +
        1;
      return newValue;
    } else {
      return asciiCharCode;
    }
  }
}
