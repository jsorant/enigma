import { UseCase } from "./shared/UseCase";
import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";

declare namespace StoreSecurityModel {
  type StoreSecurityModelBuilder =
    typeof StoreSecurityModel.StoreSecurityModelBuilder.prototype;
}

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

  private constructor(builder: StoreSecurityModel.StoreSecurityModelBuilder) {
    this.#repository = builder.repository;
  }

  static builder(): StoreSecurityModel.StoreSecurityModelBuilder {
    return new StoreSecurityModel.StoreSecurityModelBuilder();
  }

  async execute(input: StoreSecurityModelInput): Promise<void> {
    let builder = SecurityModel.builder().withName(input.securityModelName);
    for (let engine of input.engines) {
      if (engine.name === "Caesar") {
        builder = builder.withCaesar(engine.shift, engine.increment);
      } else if (engine.name === "Rotor") {
        builder = builder.withRotor(engine.value);
      }
    }
    const securityModel = builder.build();
    this.#repository.save(securityModel);
  }

  static StoreSecurityModelBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): StoreSecurityModel.StoreSecurityModelBuilder {
      this.#repository = repository;
      return this;
    }

    build(): StoreSecurityModel {
      return new StoreSecurityModel(this);
    }

    get repository(): SecurityModelRepository {
      if (this.#repository === undefined)
        throw new Error(
          "[StoreSecurityModel] A SecurityModelRepository must be provided"
        );

      return this.#repository;
    }
  };
}
