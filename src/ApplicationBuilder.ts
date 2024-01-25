import { SecurityModelRepository } from "./domain/ports/SecurityModelRepository";
import { Decrypt } from "./domain/usecase/Decrypt";
import { Encrypt } from "./domain/usecase/Encrypt";
import { StoreSecurityModel } from "./domain/usecase/StoreSecurityModel";
import { InMemorySecurityModelRepository } from "./infrastructure/repositories/InMemorySecurityModelRepository";
import { DecryptController } from "./adapter/DecryptController";
import { Server } from "./infrastructure/webserver/Server";
import { ApiRouter } from "./infrastructure/webserver/ApiRouter";
import { EncryptController } from "./adapter/EncryptController";
import { StoreSecurityModelController } from "./adapter/StoreSecurityModelController";
import { ErrorHandler } from "./infrastructure/webserver/ErrorHandler";

export class ApplicationBuilder {
  private securityModelRepository!: SecurityModelRepository;

  private storeSecurityModel!: StoreSecurityModel;
  private encrypt!: Encrypt;
  private decrypt!: Decrypt;

  private storeSecurityModelController!: StoreSecurityModelController;
  private encryptController!: EncryptController;
  private decryptController!: DecryptController;

  private apiRouter!: ApiRouter;
  private errorHandler!: ErrorHandler;
  public server!: Server;

  constructor() {
    this.buildRepositories();
    this.buildUseCases();
    this.buildControllers();
    this.buildWebServer();
  }

  private buildWebServer() {
    this.apiRouter = new ApiRouter();
    this.errorHandler = new ErrorHandler();
    this.server = Server.builder()
      .withRouter(this.apiRouter)
      .withErrorHandler(this.errorHandler)
      .build();

    this.registerRoutes();
  }

  private registerRoutes() {
    this.server.registerPostRoute(
      "/security-model",
      this.storeSecurityModelController
    );
    this.server.registerPostRoute("/encrypt", this.encryptController);
    this.server.registerPostRoute("/decrypt", this.decryptController);
  }

  private buildControllers() {
    this.storeSecurityModelController =
      StoreSecurityModelController.buildWithUseCase(this.storeSecurityModel);
    this.encryptController = EncryptController.buildWithUseCase(this.encrypt);
    this.decryptController = DecryptController.buildWithUseCase(this.decrypt);
  }

  private buildUseCases() {
    this.storeSecurityModel =
      StoreSecurityModel.buildWithSecurityModelRepository(
        this.securityModelRepository
      );
    this.encrypt = Encrypt.buildWithSecurityModelRepository(
      this.securityModelRepository
    );

    this.decrypt = Decrypt.buildWithSecurityModelRepository(
      this.securityModelRepository
    );
  }

  private buildRepositories() {
    this.securityModelRepository = new InMemorySecurityModelRepository();
  }
}
