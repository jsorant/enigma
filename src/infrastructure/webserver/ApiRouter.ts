import express, { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../adapter/Controller";

export class ApiRouter {
  public readonly expressRouter: Router;

  constructor() {
    this.expressRouter = express.Router();
  }

  registerPostRoute(controller: Controller<any, any>) {
    this.expressRouter.post(
      controller.route(),
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
