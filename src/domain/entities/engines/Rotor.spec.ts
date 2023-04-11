import { expect } from "chai";
import { RotorEngine } from "./Rotor";

describe("Rotor", () => {
  [
    {
      rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      message: "A",
      expectedOutput: "B",
    },
    {
      rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      message: "B",
      expectedOutput: "D",
    },
    {
      rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      message: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      expectedOutput: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    },
    {
      rotorValue: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      message: "DGM",
      expectedOutput: "HCZ",
    },
  ].forEach((testCase) => {
    it(`should return ${testCase.expectedOutput} with rotor value = ${testCase.rotorValue} and message = ${testCase.message}`, () => {
      const rotor = new RotorEngine(testCase.rotorValue);
      const encryptedMessage = rotor.encrypt(testCase.message);
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });
});
