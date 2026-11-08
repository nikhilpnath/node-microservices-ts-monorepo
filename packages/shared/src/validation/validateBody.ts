import { NextFunction, Request, Response } from "express";

import { AppError } from "../error/appError";
import { ZodType } from "zod";

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMsg = result.error.issues
         .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      return next(new AppError(400, errorMsg));
    }

    req.body = result.data;
    next();
  };
}
