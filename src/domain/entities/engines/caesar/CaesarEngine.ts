import { Engine } from "../Engine";
import { Increment } from "./Increment";
import { Letter } from "./Letter";
import { Shift } from "./Shift";

declare namespace CaesarEngine {
  type CaesarEngineBuilder = typeof CaesarEngine.CaesarEngineBuilder.prototype;
}

export class CaesarEngine implements Engine {
  public static readonly ENGINE_NAME = "caesar";

  private currentShift: Shift;
  readonly #originalShift: Shift;
  readonly #increment: Increment;

  private constructor(builder: CaesarEngine.CaesarEngineBuilder) {
    this.currentShift = builder.shift;
    this.#originalShift = builder.shift;
    this.#increment = builder.increment;
  }

  static builder(): CaesarEngine.CaesarEngineBuilder {
    return new this.CaesarEngineBuilder();
  }

  encrypt(message: string): string {
    this.resetCurrentShift();
    return this.transformEachLetterOf(message, this.shift);
  }

  decrypt(encryptedMessage: string): string {
    this.resetCurrentShift();
    return this.transformEachLetterOf(encryptedMessage, this.reverse);
  }

  private resetCurrentShift() {
    this.currentShift = this.#originalShift;
  }

  private transformEachLetterOf(
    aString: string,
    tranformLetterFunction: (letter: Letter) => Letter
  ): string {
    return aString
      .split("")
      .map(this.toLetter)
      .map(tranformLetterFunction, this)
      .map(this.toString)
      .join("");
  }

  private toLetter(character: string): Letter {
    return Letter.withValue(character);
  }

  private toString(letter: Letter): string {
    return letter.value;
  }

  private shift(letter: Letter): Letter {
    const shifted = letter.shift(this.currentShift);
    this.updateCurrentShiftWithIncrement();
    return shifted;
  }

  private reverse(letter: Letter): Letter {
    const shifted = letter.reverse(this.currentShift);
    this.updateCurrentShiftWithIncrement();
    return shifted;
  }

  private updateCurrentShiftWithIncrement() {
    this.currentShift = this.currentShift.addIncrement(this.#increment);
  }

  static CaesarEngineBuilder = class {
    public shift: Shift = Shift.zero();
    public increment: Increment = Increment.noIncrement();

    withShift(value: number): CaesarEngine.CaesarEngineBuilder {
      this.shift = Shift.withValue(value);
      return this;
    }

    withIncrement(value: number): CaesarEngine.CaesarEngineBuilder {
      this.increment = Increment.withValue(value);
      return this;
    }

    build(): CaesarEngine {
      return new CaesarEngine(this);
    }
  };
}
