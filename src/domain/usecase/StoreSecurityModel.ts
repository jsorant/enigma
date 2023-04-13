import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";
import { CaesarEngine } from "../entities/engines/Caesar";
import { RotorEngine } from "../entities/engines/Rotor";
import { Engine } from "../entities/Engine";
import { UseCase } from "./UseCase";

interface CaesarEngineDTO {
  name: "caesar";
  shift: number;
  increment: number;
}

interface RotorEngineDTO {
  name: "rotor";
  rotor: string;
}

type EngineDTO = CaesarEngineDTO | RotorEngineDTO;

export interface StoreSecurityModelInput {
  name: string;
  engines: Array<EngineDTO>;
}

export class StoreSecurityModel
  implements UseCase<StoreSecurityModelInput, void>
{
  private readonly repository: SecurityModelRepository;

  constructor(repository: SecurityModelRepository) {
    this.repository = repository;
  }

  async execute(input: StoreSecurityModelInput): Promise<void> {
    const model: SecurityModel = {
      name: input.name,
      engines: input.engines.map(this.adaptEngine),
    };
    this.repository.save(model);
  }

  private adaptEngine(engine: EngineDTO): Engine {
    if (engine.name === CaesarEngine.ENGINE_NAME) {
      return new CaesarEngine(engine.shift, engine.increment);
    } else if (engine.name === RotorEngine.ENGINE_NAME) {
      return new RotorEngine(engine.rotor);
    } else {
      throw new Error("Unexpected error");
    }
  }
}
