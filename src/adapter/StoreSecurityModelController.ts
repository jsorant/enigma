import {
  StoreSecurityModel,
  StoreSecurityModelInput,
} from "../domain/usecase/StoreSecurityModel";
import { Controller } from "./Controller";

export class StoreSecurityModelController extends Controller<
  StoreSecurityModelInput,
  void
> {
  constructor(storeSecurityModel: StoreSecurityModel) {
    super(storeSecurityModel);
  }

  protected adaptInput(body: any): StoreSecurityModelInput {
    return {
      name: body.name,
      engines: body.engines.map(this.adaptEngineOrThrow, this),
    };
  }

  protected adaptJsonResponseBody(usecaseResult: void): any {
    return {};
  }

  private adaptEngineOrThrow(engineFromBody: any) {
    if (engineFromBody.name === "caesar") {
      return this.adaptCaesarEngine(engineFromBody);
    } else if (engineFromBody.name === "rotor") {
      return this.adaptRotorEngine(engineFromBody);
    } else {
      throw new Error(`Unsupported engine: '${engineFromBody.name}'`);
    }
  }

  private adaptCaesarEngine(element: any) {
    return {
      name: "caesar",
      shift: element.shift,
      increment: element.increment,
    };
  }

  private adaptRotorEngine(element: any) {
    return {
      name: "rotor",
      rotor: element.rotor,
    };
  }
}
