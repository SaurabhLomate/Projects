import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createHttpError from "http-errors";
import { UserType } from "../user/types/user.type.js";
import User from "../user/models/user.model.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserType;
  }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      const error = createHttpError(400, "unable to access cookies");
      return next(error);
    }
    const payload = jwt.verify(token, config.jwt_secret_key!);
    if (!payload) {
      const error = createHttpError(400, "unable to fetch jwt payload");
      return next(error);
    }
    const user = await User.findById(payload._id).select("-password");

    if (!user) {
      const error = createHttpError(400, "no user exist with this id");
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default verifyUser;
