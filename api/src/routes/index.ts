/*
  main<index> - routes
*/

import express, { Request, Response, Router } from "express";
import { catchReponseMessage } from "../utils/catchResponse";

import { extension } from "./versions";

const router: Router = express.Router();

router.get("/extension", extension);

router.use("*", (_req: Request, res: Response) => {
  const code = 404;
  res.json(catchReponseMessage({ code }));
});

export default router;
