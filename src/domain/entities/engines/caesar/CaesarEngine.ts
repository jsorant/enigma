import { Engine } from "../../Engine";

const ASCII_CHAR_CODE_OF_A: number = "A".charCodeAt(0);
const ASCII_CHAR_CODE_OF_Z: number = "Z".charCodeAt(0);
const ALPHABET_LENGTH = 26;

declare namespace CaesarEngine {
  type CaesarEngineBuilder = typeof CaesarEngine.CaesarEngineBuilder.prototype;
}

export class CaesarEngine implements Engine {
  public static readonly ENGINE_NAME = "caesar";

  private currentShift: number;
  private readonly increment: number;

  private constructor(builder: CaesarEngine.CaesarEngineBuilder) {
    this.currentShift = builder.shift;
    this.increment = builder.increment;
  }

  static builder(): CaesarEngine.CaesarEngineBuilder {
    return new this.CaesarEngineBuilder();
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
    const shifted = this.shift(asciiCharCode);
    const shiftedInAZRange = this.ensureIsInAZRange(shifted);
    this.updateCurrentShiftWithIncrement();
    return shiftedInAZRange;
  }

  private reverseShiftAsciiCharCode(asciiCharCode: number): number {
    const shifted = this.reverseShift(asciiCharCode);
    const shiftedInAZRange = this.ensureIsInAZRange(shifted);
    this.updateCurrentShiftWithIncrement();
    return shiftedInAZRange;
  }

  private shift(asciiCharCode: number) {
    return asciiCharCode + this.currentShift;
  }

  private reverseShift(asciiCharCode: number) {
    return asciiCharCode - this.currentShift;
  }

  private updateCurrentShiftWithIncrement() {
    this.currentShift = this.currentShift + this.increment;
  }

  private ensureIsInAZRange(asciiCharCode: number): number {
    let result = asciiCharCode;
    while (result > ASCII_CHAR_CODE_OF_Z) {
      result -= ALPHABET_LENGTH;
    }
    while (result < ASCII_CHAR_CODE_OF_A) {
      result += ALPHABET_LENGTH;
    }
    return result;
  }

  static CaesarEngineBuilder = class {
    public shift: number = 0;
    public increment: number = 0;

    withShift(shift: number): CaesarEngine.CaesarEngineBuilder {
      this.shift = shift;
      return this;
    }

    withIncrement(increment: number): CaesarEngine.CaesarEngineBuilder {
      this.increment = increment;
      return this;
    }

    build(): CaesarEngine {
      return new CaesarEngine(this);
    }
  };
}
