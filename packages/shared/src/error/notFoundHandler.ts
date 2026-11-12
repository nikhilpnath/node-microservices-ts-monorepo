import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";

//No route

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`));
}
