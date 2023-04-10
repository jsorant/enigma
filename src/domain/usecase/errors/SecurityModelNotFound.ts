export class SecurityModelNotFound extends Error {
  constructor(modelName: string) {
    super(`Security model '${modelName}' not found`);
  }
}
