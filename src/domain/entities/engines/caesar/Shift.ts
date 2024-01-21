import { Increment } from "./Increment";

export class Shift {
  public readonly value: number;

  private constructor(value: number) {
    this.ensureIsInteger(value);

    this.value = value;
  }

  static zero(): Shift {
    return new Shift(0);
  }

  static withValue(value: number): Shift {
    return new Shift(value);
  }

  addIncrement(increment: Increment): Shift {
    return new Shift(this.value + increment.value);
  }

  private ensureIsInteger(value: number) {
    if (!Number.isInteger(value)) throw new Error("Shift must be an integer");
  }
}
