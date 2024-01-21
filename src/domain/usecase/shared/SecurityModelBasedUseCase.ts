import { SecurityModelRepository } from "../../ports/SecurityModelRepository";
import { SecurityModelNotFound } from "../errors/SecurityModelNotFound";
import { SecurityModel } from "../../entities/SecurityModel";

export class SecurityModelBasedUseCase {
  private readonly repository: SecurityModelRepository;

  constructor(repository: SecurityModelRepository) {
    this.repository = repository;
  }

  protected async retrieveSecurityModelOrThrow(
    modelName: string
  ): Promise<SecurityModel> {
    const model: SecurityModel | undefined = await this.repository.getByName(
      modelName
    );
    if (model === undefined) {
      throw new SecurityModelNotFound(modelName);
    }
    return model;
  }
}
