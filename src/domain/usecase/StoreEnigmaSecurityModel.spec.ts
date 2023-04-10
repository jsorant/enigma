import { expect } from "chai";
import { EnigmaSecurityModel, Enigma } from "./EnigmaSecurityModel";

describe("StoreEnigmaSecurityModel", () => {
  [
    {
      name: "enigma-1",
      caesarShift: 4,
      rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
      rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
      rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    },
  ].forEach((testCase) => {
    it(`should store the enigma security model with name ${testCase.name}`, () => {
      const parameters: EnigmaSecurityModel = {
        caesarShift: 4,
        rotor1Value: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        rotor2Value: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        rotor3Value: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      };
      //const repository = new EnimaParameters();
    });
  });
});
