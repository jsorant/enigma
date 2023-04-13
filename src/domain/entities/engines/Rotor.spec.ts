import { expect } from "chai";
import { RotorEngine } from "./Rotor";

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

describe("Rotor", () => {
  testCases.forEach((testCase) => {
    it(`should return ${testCase.encryptedMessage} when encrypting with rotor value = ${testCase.rotorValue} and message = ${testCase.plainMessage}`, () => {
      const rotor = new RotorEngine(testCase.rotorValue);
      const encryptedMessage = rotor.encrypt(testCase.plainMessage);
      expect(encryptedMessage).to.equal(testCase.encryptedMessage);
    });
  });

  testCases.forEach((testCase) => {
    it(`should return ${testCase.plainMessage} when decrypting with rotor value = ${testCase.rotorValue} and encrypted message = ${testCase.encryptedMessage}`, () => {
      const rotor = new RotorEngine(testCase.rotorValue);
      const decryptedMessage = rotor.decrypt(testCase.encryptedMessage);
      expect(decryptedMessage).to.equal(testCase.plainMessage);
    });
  });
});
