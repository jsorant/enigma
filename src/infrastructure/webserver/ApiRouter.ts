import express, { NextFunction, Request, Response, Router } from "express";
import { DecryptController } from "../../adapter/DecryptController";
import { EncryptController } from "../../adapter/EncryptController";
import { StoreSecurityModelController } from "../../adapter/StoreSecurityModelController";
import { Controller } from "../../adapter/Controller";

export class ApiRouter {
  private readonly storeSecurityModelController: StoreSecurityModelController;
  private readonly encryptController: EncryptController;
  private readonly decryptController: DecryptController;
  private readonly router: Router;

  constructor(
    storeSecurityModelController: StoreSecurityModelController,
    encryptController: EncryptController,
    decryptController: DecryptController
  ) {
    this.router = express.Router();
    this.storeSecurityModelController = storeSecurityModelController;
    this.encryptController = encryptController;
    this.decryptController = decryptController;
    this.registerApiRoutes();
  }

  getExpressRouter(): Router {
    return this.router;
  }

  private registerApiRoutes(): void {
    this.registerPostRoute(
      "/security-model",
      this.storeSecurityModelController
    );
    this.registerPostRoute("/encrypt", this.encryptController);
    this.registerPostRoute("/decrypt", this.decryptController);
  }

  private registerPostRoute(route: string, controller: Controller<any, any>) {
    this.router.post(
      route,
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const result = await controller.execute(req.body);
          res.status(result.statusCode).json(result.jsonResponseBody);
        } catch (error: any) {
          next(error);
        }
      }
    );
  }
}
