import { Router } from "express";

import authRouter from "./auth.routes";

const API = "/api/v1";

const router = Router();

router.use(`${API}/auth`, authRouter);

export default router;
