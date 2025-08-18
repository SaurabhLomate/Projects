import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

app.use("/", (req: Request, res: Response) => {
  return res.json({ message: "hello developer" });
});

export default app;
