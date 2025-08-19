import { Request, Response } from "express";
import { HttpError } from "http-errors";
import config from "../config/config.js";

const globalErrorHandler = (err: HttpError, req: Request, res: Response) => {
  const statusCode = err.statusCode;
  return res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === "production" ? err.stack : "",
  });
};

export default globalErrorHandler;
