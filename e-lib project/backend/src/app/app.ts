import express from "express";
import type { Express, Request, Response } from "express";

// import { join } from "node:path";

import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import userRouter from "../user/routes/user.route.js";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "hello developer" });
});

app.use(express.static("../src/public"));
app.use(express.json());
app.use("/api/users", userRouter);

// The global error handler should be the last middleware so it can catch errors from all previous routes and middleware.
app.use(globalErrorHandler);

export default app;
