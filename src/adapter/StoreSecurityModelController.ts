import {
  CaesarInput,
  EngineInput,
  RotorInput,
  StoreSecurityModel,
  StoreSecurityModelInput,
} from "../domain/usecase/StoreSecurityModel";
import { Controller } from "./Controller";

const ROUTE: string = "/security-model";

const CAESAR_ENGINE_NAME_FROM_BODY = "caesar";
const ROTOR_ENGINE_NAME_FROM_BODY = "rotor";

export class StoreSecurityModelController extends Controller<
  StoreSecurityModelInput,
  void
> {
  private constructor(storeSecurityModel: StoreSecurityModel) {
    super(ROUTE, storeSecurityModel);
  }

  static buildWithUseCase(storeSecurityModel: StoreSecurityModel) {
    return new StoreSecurityModelController(storeSecurityModel);
  }

  protected adaptInput(body: any): StoreSecurityModelInput {
    return {
      securityModelName: body.name,
      engines: body.engines.map(this.adaptEngineOrThrow, this),
    };
  }

  protected adaptJsonResponseBody(_usecaseResult: void): any {
    return {};
  }

  private adaptEngineOrThrow(engineFromBody: any): EngineInput {
    if (engineFromBody.name === CAESAR_ENGINE_NAME_FROM_BODY) {
      return this.adaptCaesarEngine(engineFromBody);
    } else if (engineFromBody.name === ROTOR_ENGINE_NAME_FROM_BODY) {
      return this.adaptRotorEngine(engineFromBody);
    } else {
      throw new Error(`Unsupported engine: '${engineFromBody.name}'`);
    }
  }

  private adaptCaesarEngine(element: any): CaesarInput {
    if (element.shift === undefined)
      throw new Error("Caesar engine must have a shift");
    if (typeof element.shift !== "number")
      throw new Error("Caesar engine shift must be a number");

    return {
      name: "Caesar",
      shift: element.shift,
      increment: element.increment,
    };
  }

  private adaptRotorEngine(element: any): RotorInput {
    return {
      name: "Rotor",
      value: element.value,
    };
  }
}
