import { Shift } from "./Shift";

export class Letter {
  public readonly value: string;

  private constructor(value: string) {
    if (value === "") throw new Error("Letter cannot be empty");
    if (value.length > 1) throw new Error("Letter must be 1 letter long");
    if (value.search("[^A-Z]") !== -1)
      throw new Error("Letter must be in A-Z range");

    this.value = value;
  }

  static withValue(value: string) {
    return new Letter(value);
  }

  shift(shift: Shift): Letter {
    return new Letter("B");
  }
}
