import { Caesar } from "./algorithms/Caesar";
import { Rotor } from "./algorithms/Rotor";

export interface EnigmaSecurityModel {
  readonly caesarShift: number;
  readonly rotor1Value: string;
  readonly rotor2Value: string;
  readonly rotor3Value: string;
}

export class Enigma {
  private readonly securityModel: EnigmaSecurityModel;

  constructor(parameters: EnigmaSecurityModel) {
    this.securityModel = parameters;
  }

  encrypt(message: string): string {
    let result: string;
    result = this.applyCaesar(message, this.securityModel.caesarShift);
    result = this.applyRotor(result, this.securityModel.rotor1Value);
    result = this.applyRotor(result, this.securityModel.rotor2Value);
    result = this.applyRotor(result, this.securityModel.rotor3Value);
    return result;
  }

  private applyCaesar(message: string, caesarShift: number) {
    const caesar = new Caesar(caesarShift);
    return caesar.encrypt(message);
  }

  private applyRotor(message: string, rotorValue: string) {
    const rotor = new Rotor(rotorValue);
    return rotor.encrypt(message);
  }
}
