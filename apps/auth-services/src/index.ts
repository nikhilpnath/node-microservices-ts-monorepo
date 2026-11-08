import express from "express";
import { config } from "dotenv";
import { resolve } from "node:path";

import {
  AppError,
  errorHandler,
  httpLogger,
  logger,
  successResponse,
} from "shared";

//root and current folder env configuration
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

const PORT = Number(process.env.AUTH_PORT) || 3001;

const app = express();

app.use(httpLogger);
app.use(express.json());

app.get("/health", (_req, res) => {
  successResponse(res, { service: "auth-service" });
});

//Error Handling
app.use((_req, _res, next) => {
  next(new AppError(404, "Route not found"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`auth-service is running on port ${PORT}`);
});
