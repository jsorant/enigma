import { UseCase } from "../domain/usecase/shared/UseCase";

export interface ControllerResult {
  statusCode: number;
  jsonResponseBody: any;
}

export abstract class Controller<TUseCaseInput, TUseCaseResult> {
  private readonly usecase: UseCase<TUseCaseInput, TUseCaseResult>;

  constructor(usecase: UseCase<TUseCaseInput, TUseCaseResult>) {
    this.usecase = usecase;
  }

  async execute(body: any): Promise<ControllerResult> {
    const input = this.adaptInput(body);
    const usecaseResult = await this.usecase.execute(input);
    const result = this.adaptResult(usecaseResult);
    return result;
  }

  protected abstract adaptInput(body: any): TUseCaseInput;
  protected abstract adaptJsonResponseBody(usecaseResult: TUseCaseResult): any;

  private adaptResult(usecaseResult: TUseCaseResult): ControllerResult {
    return {
      statusCode: 200,
      jsonResponseBody: this.adaptJsonResponseBody(usecaseResult),
    };
  }
}
