import { Request, Response, NextFunction } from "express";

import * as authServices from "../services/auth.service";
import { successResponse } from "shared";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await authServices.register(req.body);

    successResponse(res, {user}, 201);
  } catch (err) {
    next(err);
  }
}
