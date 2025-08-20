import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

/**
 * take info from req.body
 * validate info
 * check if user already exist with email
 * if yes give error
 * if no hash password and register user
 * generate token
 */
const userRegister = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, avatar } = req.body;

  if (!username || !email || !password) {
    const error = createHttpError(400, "please pass all fields");
    return next(error);
  }

  res.status(201).json({ message: "register controller" });
};

export default userRegister;
