import { expect } from "chai";
import { CaesarEngine } from "./Caesar";

const testCases = [
  { shift: 4, increment: 1, plainMessage: "A", encryptedMessage: "E" },
  { shift: 4, increment: 1, plainMessage: "B", encryptedMessage: "F" },
  { shift: 4, increment: 1, plainMessage: "C", encryptedMessage: "G" },
  { shift: 6, increment: 1, plainMessage: "A", encryptedMessage: "G" },
  { shift: 1, increment: 1, plainMessage: "Z", encryptedMessage: "A" },
  { shift: 27, increment: 1, plainMessage: "Z", encryptedMessage: "A" },
  { shift: -1, increment: 1, plainMessage: "B", encryptedMessage: "A" },
  { shift: -1, increment: 1, plainMessage: "A", encryptedMessage: "Z" },
  { shift: -4, increment: 1, plainMessage: "EEE", encryptedMessage: "ABC" },
  { shift: -27, increment: 1, plainMessage: "A", encryptedMessage: "Z" },
  { shift: 4, increment: 1, plainMessage: "AAA", encryptedMessage: "EFG" },
  {
    shift: 3,
    increment: 1,
    plainMessage: "AAAZZZ",
    encryptedMessage: "DEFFGH",
  },
  { shift: 4, increment: 2, plainMessage: "AAA", encryptedMessage: "EGI" },
  { shift: 4, increment: 5, plainMessage: "AAA", encryptedMessage: "EJO" },
  { shift: 4, increment: 0, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: 4, increment: 26, plainMessage: "AAA", encryptedMessage: "EEE" },
  { shift: 0, increment: 26, plainMessage: "AAA", encryptedMessage: "AAA" },
];

describe("Caesar", () => {
  testCases.forEach((testCase) => {
    it(`should return ${testCase.encryptedMessage} when encrypting with shift = ${testCase.shift}, increment = ${testCase.increment} and message = ${testCase.plainMessage}`, () => {
      const caesar = new CaesarEngine(testCase.shift, testCase.increment);
      const encryptedMessage = caesar.encrypt(testCase.plainMessage);
      expect(encryptedMessage).to.equal(testCase.encryptedMessage);
    });
  });

  testCases.forEach((testCase) => {
    it(`should return ${testCase.plainMessage} when decrypting with shift = ${testCase.shift}, increment = ${testCase.increment} and encrypted message = ${testCase.encryptedMessage}`, () => {
      const caesar = new CaesarEngine(testCase.shift, testCase.increment);
      const decryptedMessage = caesar.decrypt(testCase.encryptedMessage);
      expect(decryptedMessage).to.equal(testCase.plainMessage);
    });
  });
});
