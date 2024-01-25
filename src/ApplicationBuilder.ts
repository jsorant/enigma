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
  private readonly securityModelRepository: SecurityModelRepository;
  private readonly storeSecurityModel: StoreSecurityModel;
  private readonly encrypt: Encrypt;
  private readonly decrypt: Decrypt;
  private readonly storeSecurityModelController: StoreSecurityModelController;
  private readonly encryptController: EncryptController;
  private readonly decryptController: DecryptController;
  private readonly apiRouter: ApiRouter;
  private readonly errorHandler: ErrorHandler;
  public readonly server: Server;

  constructor() {
    this.securityModelRepository = new InMemorySecurityModelRepository();
    this.storeSecurityModel = StoreSecurityModel.builder()
      .withSecurityModelRepository(this.securityModelRepository)
      .build();
    this.encrypt = Encrypt.builder()
      .withSecurityModelRepository(this.securityModelRepository)
      .build();
    this.decrypt = Decrypt.builder()
      .withSecurityModelRepository(this.securityModelRepository)
      .build();
    this.storeSecurityModelController =
      StoreSecurityModelController.buildWithUseCase(this.storeSecurityModel);
    this.encryptController = EncryptController.buildWithUseCase(this.encrypt);
    this.decryptController = DecryptController.buildWithUseCase(this.decrypt);
    this.apiRouter = new ApiRouter();
    this.errorHandler = new ErrorHandler();

    this.server = Server.builder()
      .withRouter(this.apiRouter)
      .withErrorHandler(this.errorHandler)
      .build();

    this.server.registerPostRoute(
      "/security-model",
      this.storeSecurityModelController
    );
    this.server.registerPostRoute("/encrypt", this.encryptController);
    this.server.registerPostRoute("/decrypt", this.decryptController);
  }
}
