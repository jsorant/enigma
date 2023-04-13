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
      engines: body.engines.map((element: any) => {
        if (element.name === "caesar") {
          return {
            name: "caesar",
            shift: element.shift,
            increment: element.increment,
          };
        } else if (element.name === "rotor") {
          return {
            name: "rotor",
            rotor: element.rotor,
          };
        } else {
          throw new Error(`Unsupported engine: '${element.name}'`);
        }
      }),
    };
  }

  protected adaptJsonResponseBody(usecaseResult: void): any {
    return {};
  }
}
