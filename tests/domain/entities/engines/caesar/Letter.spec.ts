import { expect, test, describe } from "vitest";
import { Letter } from "../../../../../src/domain/entities/engines/caesar/Letter";
import { Shift } from "../../../../../src/domain/entities/engines/caesar/Shift";

describe("Letter", () => {
  describe("Build", () => {
    test(`should not build with an empty string`, () => {
      expect(() => {
        Letter.withValue("");
      }).toThrowError("Letter cannot be empty");
    });

    test(`should not build with a string of length > 1`, () => {
      expect(() => {
        Letter.withValue("AA");
      }).toThrowError("Letter must be 1 letter long");
    });

    test(`should not build with a character not in A-Z range`, () => {
      expect(() => {
        Letter.withValue("-");
      }).toThrowError("Letter must be in A-Z range");
    });

    test(`should shift A to B with shift = 1`, () => {
      const letter = Letter.withValue("A");
      const shiftOne = Shift.withValue(1);

      expect(letter.shift(shiftOne).value).toBe("B");
    });
  });
});
