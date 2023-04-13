import { NextFunction, Request, Response } from "express";

export class ErrorHandler {
  handle(err: Error, req: Request, res: Response, next: NextFunction): void {
    res.status(500).json({ error: err.message });
  }
}
