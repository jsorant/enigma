import { expect, test, describe } from "vitest";
import { CaesarEngine } from "../../../src/domain/entities/engines/caesar/CaesarEngine";

const testCasesWithShiftOnly = [
  { shift: 4, plainMessage: "A", encryptedMessage: "E" },
  { shift: -4, plainMessage: "E", encryptedMessage: "A" },
  { shift: 1, plainMessage: "Z", encryptedMessage: "A" },
  { shift: -1, plainMessage: "A", encryptedMessage: "Z" },
  { shift: 26, plainMessage: "A", encryptedMessage: "A" },
  { shift: 78, plainMessage: "A", encryptedMessage: "A" },
  { shift: -26, plainMessage: "A", encryptedMessage: "A" },
  { shift: -78, plainMessage: "A", encryptedMessage: "A" },
  { shift: 4, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: -4, plainMessage: "EEE", encryptedMessage: "AAA" },
];

const testCasesWithShiftAndIncrement = [
  { shift: 4, increment: 1, plainMessage: "AAA", encryptedMessage: "EFG" },
  { shift: -4, increment: 1, plainMessage: "EEE", encryptedMessage: "ABC" },
  {
    shift: 3,
    increment: 1,
    plainMessage: "AAAZZZ",
    encryptedMessage: "DEFFGH",
  },
  { shift: 4, increment: 5, plainMessage: "AAA", encryptedMessage: "EJO" },
  { shift: 4, increment: 26, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: 0, increment: 26, plainMessage: "AAA", encryptedMessage: "AAA" },
];

describe("CaesarEngine", () => {
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

  testCasesWithShiftOnly.forEach((testCase) => {
    test(`should return ${testCase.encryptedMessage} when encrypting with shift = ${testCase.shift} and message = ${testCase.plainMessage}`, () => {
      const caesar = CaesarEngine.builder().withShift(testCase.shift).build();

      const encryptedMessage = caesar.encrypt(testCase.plainMessage);

      expect(encryptedMessage).to.equal(testCase.encryptedMessage);
    });

    test(`should return ${testCase.plainMessage} when decrypting with shift = ${testCase.shift} and encrypted message = ${testCase.encryptedMessage}`, () => {
      const caesar = CaesarEngine.builder().withShift(testCase.shift).build();

      const decryptedMessage = caesar.decrypt(testCase.encryptedMessage);

      expect(decryptedMessage).to.equal(testCase.plainMessage);
    });
  });

  testCasesWithShiftAndIncrement.forEach((testCase) => {
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
