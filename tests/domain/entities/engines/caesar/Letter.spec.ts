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
  });

  describe("Shift", () => {
    test(`should do nothing with shift = 0`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.zero();

      expect(letter.shift(shift).value).toBe("A");
    });

    test(`should shift A to C with shift = 2`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.withValue(2);

      expect(letter.shift(shift).value).toBe("C");
    });

    test(`should cycle from Z to A with shift = 1`, () => {
      const letter = Letter.withValue("Z");
      const shift = Shift.withValue(1);

      expect(letter.shift(shift).value).toBe("A");
    });

    test(`should cycle back to original value with shift = 26`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.withValue(26);

      expect(letter.shift(shift).value).toBe("A");
    });

    test(`should cycle from Z to A with shift = 27`, () => {
      const letter = Letter.withValue("Z");
      const shift = Shift.withValue(27);

      expect(letter.shift(shift).value).toBe("A");
    });

    test(`should shift C to A with shift = -2`, () => {
      const letter = Letter.withValue("C");
      const shift = Shift.withValue(-2);

      expect(letter.shift(shift).value).toBe("A");
    });

    test(`should cycle from A to Z with shift = -1`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.withValue(-1);

      expect(letter.shift(shift).value).toBe("Z");
    });

    test(`should cycle from A to Z with shift = -27`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.withValue(-27);

      expect(letter.shift(shift).value).toBe("Z");
    });
  });

  describe("Reverse shift", () => {
    test(`should do nothing with shift = 0`, () => {
      const letter = Letter.withValue("A");
      const shift = Shift.zero();

      expect(letter.reverse(shift).value).toBe("A");
    });

    test(`should reverse C to A with shift = 2`, () => {
      const letter = Letter.withValue("C");
      const shift = Shift.withValue(2);

      expect(letter.reverse(shift).value).toBe("A");
    });

    test(`should cycle from A to Z with shift = 1`, () => {
      const letter = Letter.withValue("A");
      const shiftOne = Shift.withValue(1);

      expect(letter.reverse(shiftOne).value).toBe("Z");
    });

    test(`should cycle back to original value with shift = 26`, () => {
      const letter = Letter.withValue("A");
      const shiftOne = Shift.withValue(0);

      expect(letter.reverse(shiftOne).value).toBe("A");
    });

    test(`should cycle from A to Z with shift = 27`, () => {
      const letter = Letter.withValue("A");
      const shiftOne = Shift.withValue(27);

      expect(letter.reverse(shiftOne).value).toBe("Z");
    });

    test(`should reverse A to C with shift = -2`, () => {
      const letter = Letter.withValue("A");
      const shiftOne = Shift.withValue(-2);

      expect(letter.reverse(shiftOne).value).toBe("C");
    });

    test(`should cycle from Z to A with shift = -1`, () => {
      const letter = Letter.withValue("Z");
      const shiftOne = Shift.withValue(-1);

      expect(letter.reverse(shiftOne).value).toBe("A");
    });

    test(`should cycle from Z to A with shift = -27`, () => {
      const letter = Letter.withValue("Z");
      const shiftOne = Shift.withValue(-27);

      expect(letter.reverse(shiftOne).value).toBe("A");
    });
  });
});
