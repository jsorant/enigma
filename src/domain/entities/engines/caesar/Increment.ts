export class Increment {
  public readonly value: number;

  private constructor(value: number) {
    this.ensureIsInteger(value);
    this.ensureIsPositiveOrZero(value);

    this.value = value;
  }

  static noIncrement(): Increment {
    return new Increment(0);
  }

  static withValue(value: number): Increment {
    return new Increment(value);
  }

  private ensureIsInteger(value: number) {
    if (!Number.isInteger(value))
      throw new Error("Increment must be an integer");
  }

  private ensureIsPositiveOrZero(value: number) {
    if (value < 0) throw new Error("Increment must be positive");
  }
}
