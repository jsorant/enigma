import { expect } from "chai";
import { CaesarEngine } from "./Caesar";

describe("Caesar", () => {
  [
    { shift: 4, increment: 1, message: "A", expectedOutput: "E" },
    { shift: 4, increment: 1, message: "B", expectedOutput: "F" },
    { shift: 4, increment: 1, message: "C", expectedOutput: "G" },
    { shift: 6, increment: 1, message: "A", expectedOutput: "G" },
    { shift: 1, increment: 1, message: "Z", expectedOutput: "A" },
    { shift: 27, increment: 1, message: "Z", expectedOutput: "A" },
    { shift: -1, increment: 1, message: "B", expectedOutput: "A" },
    { shift: -1, increment: 1, message: "A", expectedOutput: "Z" },
    { shift: -4, increment: 1, message: "EEE", expectedOutput: "ABC" },
    { shift: -27, increment: 1, message: "A", expectedOutput: "Z" },
    { shift: 4, increment: 1, message: "AAA", expectedOutput: "EFG" },
    { shift: 3, increment: 1, message: "AAAZZZ", expectedOutput: "DEFFGH" },
    { shift: 4, increment: 2, message: "AAA", expectedOutput: "EGI" },
    { shift: 4, increment: 5, message: "AAA", expectedOutput: "EJO" },
    { shift: 4, increment: 0, message: "AAA", expectedOutput: "EEE" },
    { shift: 4, increment: 26, message: "AAA", expectedOutput: "EEE" },
    { shift: 0, increment: 26, message: "AAA", expectedOutput: "AAA" },
  ].forEach((testCase) => {
    it(`should return ${testCase.expectedOutput} with shift = ${testCase.shift}, increment = ${testCase.increment} and message = ${testCase.message}`, () => {
      const caesar = new CaesarEngine(testCase.shift, testCase.increment);
      const encryptedMessage = caesar.encrypt(testCase.message);
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });
});
