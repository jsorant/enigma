import { expect } from "chai";
import { EnigmaSecurityModel, Enigma } from "./Enigma";

describe("Enigma", () => {
  [
    {
      name: "enigma-1",
      message: "AAA",
      caesarShift: 4,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "KQF",
    },
    {
      name: "enigma-2",
      message: "WEATHERREPORTWINDYTODAY",
      caesarShift: 7,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "ALWAURKQEQQWLRAWZHUYKVN",
    },
    {
      name: "enigma-3",
      message: "EVERYONEISWELCOMEHERE",
      caesarShift: 9,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "PQSACVVTOISXFXCIAMQEM",
    },
    {
      name: "enigma-4",
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      caesarShift: 9,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
    },
  ].forEach((testCase) => {
    it(`should return ${testCase.expectedOutput} with test case ${testCase.name}`, () => {
      const parameters: EnigmaSecurityModel = {
        caesarShift: testCase.caesarShift,
        rotor1Value: testCase.rotor1Value,
        rotor2Value: testCase.rotor2Value,
        rotor3Value: testCase.rotor3Value,
      };
      const enigma = new Enigma(parameters);
      const encryptedMessage = enigma.encrypt(testCase.message);
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });
});
