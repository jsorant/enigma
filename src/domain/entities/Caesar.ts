export class Caesar {
  private readonly asciiCharCodeOfA: number = "A".charCodeAt(0);
  private readonly asciiCharCodeOfZ: number = "Z".charCodeAt(0);
  private currentShift: number;
  private readonly increment: number = 1;

  constructor(shift: number) {
    this.currentShift = shift;
  }

  encrypt(input: string): string {
    return input
      .split("")
      .map((element) => element.charCodeAt(0))
      .map((element) => this.shift(element))
      .map((element) => String.fromCharCode(element))
      .join("");
  }

  private shift(asciiCharCode: number): number {
    const shiftedAsciiCharCode = asciiCharCode + this.currentShift;
    this.currentShift = this.currentShift + this.increment;
    return this.cycleAsciiCodeIntoAToZRangeIfNeeded(shiftedAsciiCharCode);
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
