import { UseCase } from "./shared/UseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";

export interface RotorInput {
  name: "Rotor";
  value: string;
}

export interface CaesarInput {
  name: "Caesar";
  shift: number;
  increment: number;
}

export type EngineInput = RotorInput | CaesarInput;

export interface StoreSecurityModelInput {
  securityModelName: string;
  engines: Array<EngineInput>;
}

export class StoreSecurityModel
  implements UseCase<StoreSecurityModelInput, void>
{
  readonly #repository: SecurityModelRepository;

  private constructor(repository: SecurityModelRepository) {
    this.#repository = repository;
  }

  static buildWithSecurityModelRepository(
    repository: SecurityModelRepository
  ): StoreSecurityModel {
    return new StoreSecurityModel(repository);
  }

  async execute(input: StoreSecurityModelInput): Promise<void> {
    let builder = SecurityModel.builder().withName(input.securityModelName);
    for (let engine of input.engines) {
      if (engine.name === "Caesar") {
        builder = builder.withCaesar(engine.shift, engine.increment);
      } else {
        builder = builder.withRotor(engine.value);
      }
    }
    const securityModel = builder.build();
    await this.#repository.save(securityModel);
  }
}
