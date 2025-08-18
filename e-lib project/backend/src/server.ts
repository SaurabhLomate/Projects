import type { Express, Request, Response } from "express";
import express from "express";

const app: Express = express();

app.use("/", (req: Request, res: Response) => {
  return res.json({ message: "hello developer" });
});

app.listen(3000, () => {
  console.log("listening");
});
