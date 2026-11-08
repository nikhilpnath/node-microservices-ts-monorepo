import { Request, Response, NextFunction } from "express";

import { AppError } from "./appError";
import { logger } from "../logger/logger";
import { failureResponse } from "../response/response";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return failureResponse(res, error.message, error.statusCode);
  }

  logger.error(error);

  return failureResponse(res, "Internal Server Error", 500);
}
