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

export class DependencyInjector {
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
    this.storeSecurityModel = new StoreSecurityModel(
      this.securityModelRepository
    );
    this.encrypt = new Encrypt(this.securityModelRepository);
    this.decrypt = new Decrypt(this.securityModelRepository);
    this.storeSecurityModelController = new StoreSecurityModelController(
      this.storeSecurityModel
    );
    this.encryptController = new EncryptController(this.encrypt);
    this.decryptController = new DecryptController(this.decrypt);
    this.apiRouter = new ApiRouter(
      this.storeSecurityModelController,
      this.encryptController,
      this.decryptController
    );
    this.errorHandler = new ErrorHandler();
    this.server = new Server(this.apiRouter, this.errorHandler);
  }
}
