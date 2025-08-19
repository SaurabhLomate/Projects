import express from "express";
import type { Express, Request, Response } from "express";
import globalErrorHandler from "../middlewares/globalErrorHandler.js";

const app: Express = express();

app.use(globalErrorHandler);

app.use("/", (req: Request, res: Response) => {
  return res.json({ message: "hello developer" });
});

export default app;
