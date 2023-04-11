import { expect } from "chai";
import { EnigmaSecurityModel, Enigma } from "./Enigma";

describe("Enigma", () => {
  [
    {
      name: "enigma-0",
      message: "AAA",
      caesarShift: 4,
      caesarIncrement: 0,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "KKK",
    },
    {
      name: "enigma-1",
      message: "AAA",
      caesarShift: 4,
      caesarIncrement: 1,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "KQF",
    },
    {
      name: "enigma-2",
      message: "AAA",
      caesarShift: 4,
      caesarIncrement: 2,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "KFD",
    },
    {
      name: "enigma-3",
      message: "WEATHERREPORTWINDYTODAY",
      caesarShift: 7,
      caesarIncrement: 1,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "ALWAURKQEQQWLRAWZHUYKVN",
    },
    {
      name: "enigma-4",
      message: "EVERYONEISWELCOMEHERE",
      caesarShift: 9,
      caesarIncrement: 1,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "PQSACVVTOISXFXCIAMQEM",
    },
    {
      name: "enigma-5",
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      caesarShift: 9,
      caesarIncrement: 1,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      expectedOutput: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
    },
    {
      name: "enigma-6",
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
      caesarShift: 9,
      caesarIncrement: 3,
      rotor1Value: "BDFHTXVZNYEIWGAKMUSQOJLCPR",
      rotor2Value: "AJDKSIRUXBGZNPYFVOELHWTMCQ",
      rotor3Value: "TOWYHXUSPAIBRCJEKMFLGDQVZN",
      expectedOutput: "MKDWDLTEUPWZBXMTWUUROXHBZBYJDAMZRUWXJZAACQ",
    },
  ].forEach((testCase) => {
    it(`should return ${testCase.expectedOutput} with test case ${testCase.name}`, () => {
      const parameters: EnigmaSecurityModel = {
        caesarShift: testCase.caesarShift,
        caesarIncrement: testCase.caesarIncrement,
        rotor1Value: testCase.rotor1Value,
        rotor2Value: testCase.rotor2Value,
        rotor3Value: testCase.rotor3Value,
      };
      const enigma = new Enigma(testCase.message, parameters);
      const encryptedMessage = enigma.encrypt();
      expect(encryptedMessage).to.equal(testCase.expectedOutput);
    });
  });
});
