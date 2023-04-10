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
  private encryptedMessage: string;

  constructor(message: string, parameters: EnigmaSecurityModel) {
    this.securityModel = parameters;
    this.encryptedMessage = message;
  }

  encrypt(): string {
    this.applyCaesar();
    this.applyRotor1();
    this.applyRotor2();
    this.applyRotor3();
    return this.encryptedMessage;
  }

  private applyCaesar() {
    const caesar = new Caesar(this.securityModel.caesarShift);
    this.encryptedMessage = caesar.encrypt(this.encryptedMessage);
  }

  private applyRotor1() {
    this.applyRotor(this.securityModel.rotor1Value);
  }

  private applyRotor2() {
    this.applyRotor(this.securityModel.rotor2Value);
  }

  private applyRotor3() {
    this.applyRotor(this.securityModel.rotor3Value);
  }

  private applyRotor(rotorValue: string) {
    const rotor = new Rotor(rotorValue);
    this.encryptedMessage = rotor.encrypt(this.encryptedMessage);
  }
}
