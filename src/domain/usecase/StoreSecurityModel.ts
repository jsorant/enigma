import { SecurityModelRepository } from "../ports/SecurityModelRepository";
import { SecurityModel } from "../entities/SecurityModel";
import { UseCase } from "./shared/UseCase";

declare namespace StoreSecurityModel {
  type StoreSecurityModelBuilder =
    typeof StoreSecurityModel.StoreSecurityModelBuilder.prototype;
}
export class StoreSecurityModel implements UseCase<void> {
  readonly #repository: SecurityModelRepository;
  readonly #securityModel: SecurityModel;

  private constructor(builder: StoreSecurityModel.StoreSecurityModelBuilder) {
    this.#repository = builder.repository;
    this.#securityModel = builder.securityModel;
  }

  static builder(): StoreSecurityModel.StoreSecurityModelBuilder {
    return new StoreSecurityModel.StoreSecurityModelBuilder();
  }

  async execute(): Promise<void> {
    this.#repository.save(this.#securityModel);
  }

  static StoreSecurityModelBuilder = class {
    #repository: SecurityModelRepository | undefined = undefined;
    #securityModel: SecurityModel | undefined = undefined;

    withSecurityModelRepository(
      repository: SecurityModelRepository
    ): StoreSecurityModel.StoreSecurityModelBuilder {
      this.#repository = repository;
      return this;
    }

    withSecurityModel(
      securityModel: SecurityModel
    ): StoreSecurityModel.StoreSecurityModelBuilder {
      this.#securityModel = securityModel;
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

    get securityModel(): SecurityModel {
      if (this.#securityModel === undefined)
        throw new Error(
          "[StoreSecurityModel] A SecurityModel must be provided"
        );

      return this.#securityModel;
    }
  };
}
