import { expect, test, describe } from "vitest";
import { CaesarEngine } from "../../../../../src/domain/entities/engines/caesar/CaesarEngine";

const testCases = [
  { shift: 4, increment: 0, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: 4, increment: 5, plainMessage: "AAA", encryptedMessage: "EJO" },
  {
    shift: -4,
    increment: 1,
    plainMessage: "EEEEEE",
    encryptedMessage: "ABCDEF",
  },
  {
    shift: 3,
    increment: 1,
    plainMessage: "AAAZZZ",
    encryptedMessage: "DEFFGH",
  },
  { shift: 4, increment: 26, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: 0, increment: 26, plainMessage: "AAA", encryptedMessage: "AAA" },
];

describe("CaesarEngine", () => {
  describe("Build", () => {
    test(`should not build with non integer shift`, () => {
      expect(() => {
        CaesarEngine.builder().withShift(1.2).build();
      }).toThrowError("Shift must be an integer");
    });

    test(`should not build with non integer increment`, () => {
      expect(() => {
        CaesarEngine.builder().withIncrement(1.2).build();
      }).toThrowError("Increment must be an integer");
    });

    test(`should not build with negative increment`, () => {
      expect(() => {
        CaesarEngine.builder().withIncrement(-2).build();
      }).toThrowError("Increment must be positive");
    });
  });

  test(`should produce original message if encrypt with no shift nor increment`, () => {
    const caesar = CaesarEngine.builder().build();

    const encryptedMessage = caesar.encrypt("ANYMESSAGE");

    expect(encryptedMessage).to.equal("ANYMESSAGE");
  });

  test(`should produce original message if decrypt with no shift nor increment`, () => {
    const caesar = CaesarEngine.builder().build();

    const encryptedMessage = caesar.decrypt("ANYMESSAGE");

    expect(encryptedMessage).to.equal("ANYMESSAGE");
  });

  test(`should produce the same output when encrypting twice with shift and increment`, () => {
    const caesar = CaesarEngine.builder().withShift(3).withIncrement(1).build();
    const messageToEncrypt = "AAAZZZ";

    const firstEncryptedMessage = caesar.encrypt(messageToEncrypt);
    const secondEncryptedMessage = caesar.encrypt(messageToEncrypt);

    expect(firstEncryptedMessage).to.equal(secondEncryptedMessage);
  });

  testCases.forEach((testCase) => {
    test(`should return ${testCase.encryptedMessage} when encrypting with shift = ${testCase.shift}, increment = ${testCase.increment} and message = ${testCase.plainMessage}`, () => {
      const caesar = CaesarEngine.builder()
        .withShift(testCase.shift)
        .withIncrement(testCase.increment)
        .build();

      const encryptedMessage = caesar.encrypt(testCase.plainMessage);

      expect(encryptedMessage).to.equal(testCase.encryptedMessage);
    });

    test(`should return ${testCase.plainMessage} when decrypting with shift = ${testCase.shift}, increment = ${testCase.increment} and encrypted message = ${testCase.encryptedMessage}`, () => {
      const caesar = CaesarEngine.builder()
        .withShift(testCase.shift)
        .withIncrement(testCase.increment)
        .build();

      const decryptedMessage = caesar.decrypt(testCase.encryptedMessage);

      expect(decryptedMessage).to.equal(testCase.plainMessage);
    });
  });
});
