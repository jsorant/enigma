import express from "express";
import bodyParser from "body-parser";
import { ApiRouter } from "./ApiRouter";
import { ErrorHandler } from "./ErrorHandler";
import { Controller } from "../../adapter/Controller";

declare namespace Server {
  type ServerBuilder = typeof Server.ServerBuilder.prototype;
}

export class Server {
  readonly expressApplication: express.Application;
  readonly #apiRouter: ApiRouter;
  readonly #errorHandler: ErrorHandler;

  private constructor(builder: Server.ServerBuilder) {
    this.expressApplication = express();
    this.#apiRouter = builder.apiRouter;
    this.#errorHandler = builder.errorHandler;

    this.setupExpressApplication();
  }

  static builder(): Server.ServerBuilder {
    return new Server.ServerBuilder();
  }

  registerPostRoute(route: string, controller: Controller<any, any>) {
    this.#apiRouter.registerPostRoute(route, controller);
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
    this.expressApplication.use("/", this.#apiRouter.expressRouter);
  }

  private setupErrorHandler() {
    this.expressApplication.use(this.#errorHandler.handle);
  }

  static ServerBuilder = class {
    #apiRouter: ApiRouter | undefined;
    #errorHandler: ErrorHandler | undefined;

    withRouter(apiRouter: ApiRouter): Server.ServerBuilder {
      this.#apiRouter = apiRouter;
      return this;
    }

    withErrorHandler(errorHandler: ErrorHandler): Server.ServerBuilder {
      this.#errorHandler = errorHandler;
      return this;
    }

    build(): Server {
      return new Server(this);
    }

    get apiRouter(): ApiRouter {
      if (this.#apiRouter === undefined)
        throw new Error("Cannot build Server without a router");

      return this.#apiRouter;
    }

    get errorHandler(): ErrorHandler {
      if (this.#errorHandler === undefined)
        throw new Error("Cannot build Server without an error handler");

      return this.#errorHandler;
    }
  };
}
