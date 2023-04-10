import { EnigmaSecurityModel } from "../entities/Enigma";
import { EnigmaSecurityModelRepository } from "../ports/EnigmaSecurityModelRepository";

export interface StoreEnigmaSecurityModelInput {
  name: string;
  caesarShift: number;
  rotor1Value: string;
  rotor2Value: string;
  rotor3Value: string;
}

export class StoreEnigmaSecurityModel {
  private readonly repository: EnigmaSecurityModelRepository;

  constructor(repository: EnigmaSecurityModelRepository) {
    this.repository = repository;
  }

  async execute(input: StoreEnigmaSecurityModelInput): Promise<void> {
    const model: EnigmaSecurityModel = {
      caesarShift: input.caesarShift,
      rotor1Value: input.rotor1Value,
      rotor2Value: input.rotor2Value,
      rotor3Value: input.rotor3Value,
    };
    this.repository.save(input.name, model);
  }
}
