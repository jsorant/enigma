import express from "express";
import bodyParser from "body-parser";
import { ApiRouter } from "./ApiRouter";
import { ErrorHandler } from "./ErrorHandler";

export class Server {
  readonly expressApplication: express.Application;
  private readonly apiRouter: ApiRouter;
  private readonly errorHandler: ErrorHandler;

  constructor(apiRouter: ApiRouter, errorHandler: ErrorHandler) {
    this.expressApplication = express();
    this.apiRouter = apiRouter;
    this.errorHandler = errorHandler;

    this.setupExpressApplication();
  }

  start(port: number): void {
    this.expressApplication.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  }

  private setupExpressApplication() {
    this.setupUtilityMiddlewares();
    this.setupApiRoutes();
    this.setupErrorHandler();
  }

  private setupUtilityMiddlewares() {
    this.expressApplication.use(bodyParser.urlencoded({ extended: true }));
    this.expressApplication.use(bodyParser.json());
  }

  private setupApiRoutes() {
    this.expressApplication.use("/", this.apiRouter.getExpressRouter());
  }

  private setupErrorHandler() {
    this.expressApplication.use(this.errorHandler.handle);
  }
}
