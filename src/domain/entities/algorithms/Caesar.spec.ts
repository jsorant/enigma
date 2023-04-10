import { expect } from "chai";
import { Caesar } from "./Caesar";

describe("Caesar", () => {
  [
    { shift: 4, message: "A", expectedOutput: "E" },
    { shift: 4, message: "B", expectedOutput: "F" },
    { shift: 4, message: "C", expectedOutput: "G" },
    { shift: 6, message: "A", expectedOutput: "G" },
    { shift: 1, message: "Z", expectedOutput: "A" },
    { shift: 27, message: "Z", expectedOutput: "A" },
    { shift: -1, message: "B", expectedOutput: "A" },
    { shift: -1, message: "A", expectedOutput: "Z" },
    { shift: -4, message: "EEE", expectedOutput: "ABC" },
    { shift: -27, message: "A", expectedOutput: "Z" },
    { shift: 4, message: "AAA", expectedOutput: "EFG" },
    { shift: 3, message: "AAAZZZ", expectedOutput: "DEFFGH" },
  ].forEach((testCase) => {
    it(`should return ${testCase.expectedOutput} with shift = ${testCase.shift} and message = ${testCase.message}`, () => {
      const caesar = new Caesar(testCase.shift);
      const encryptedMessage = caesar.encrypt(testCase.message);
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });
});
