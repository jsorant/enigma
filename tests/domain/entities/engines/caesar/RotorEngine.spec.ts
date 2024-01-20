import { expect, test, describe } from "vitest";
import { RotorEngine } from "../../../../../src/domain/entities/engines/rotor/RotorEngine";

const testCases = [
  {
    rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    plainMessage: "A",
    encryptedMessage: "B",
  },
  {
    rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    plainMessage: "B",
    encryptedMessage: "D",
  },
  {
    rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    plainMessage: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    encryptedMessage: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  },
  {
    rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    plainMessage: "DGM",
    encryptedMessage: "HCZ",
  },
];

describe("RotorEngine", () => {
  describe("Build", () => {
    test("should not build without a rotor value", () => {
      expect(() => RotorEngine.builder().build()).toThrowError(
        "No rotor value provided"
      );
    });

    test("should not build with a rotor value that has not 26 letters", () => {
      expect(() => RotorEngine.builder().withValue("ABC").build()).toThrowError(
        "Rotor value length must be 26 letters"
      );
    });

    test("should not build with a rotor that contains letters outside A-Z range", () => {
      expect(() =>
        RotorEngine.builder().withValue("ABCDEFGHIJK-MNOPQRSTUVWXYZ").build()
      ).toThrowError("Rotor value must only include characters in A-Z range");
    });

    test("should not build with a rotor value that has duplicated letters", () => {
      expect(() =>
        RotorEngine.builder().withValue("ABCDEFGHIJKKMNOPQRSTUVWXYZ").build()
      ).toThrowError("Rotor value cannot have duplicated letters");
    });
  });

  testCases.forEach((testCase) => {
    test(`should return ${testCase.encryptedMessage} when encrypting with rotor value = ${testCase.rotorValue} and message = ${testCase.plainMessage}`, () => {
      const rotor = RotorEngine.builder()
        .withValue(testCase.rotorValue)
        .build();

      const encryptedMessage = rotor.encrypt(testCase.plainMessage);

      expect(encryptedMessage).to.equal(testCase.encryptedMessage);
    });

    test(`should return ${testCase.plainMessage} when decrypting with rotor value = ${testCase.rotorValue} and encrypted message = ${testCase.encryptedMessage}`, () => {
      const rotor = RotorEngine.builder()
        .withValue(testCase.rotorValue)
        .build();

      const decryptedMessage = rotor.decrypt(testCase.encryptedMessage);

      expect(decryptedMessage).to.equal(testCase.plainMessage);
    });
  });
});
