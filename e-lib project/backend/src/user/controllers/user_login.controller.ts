import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model.js";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError(400, "please pass all fields");
    return next(error);
  }

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    const error = createHttpError(400, "user does not exist with this email");
    return next(error);
  }

  // check password
  const isPassCorrect = isUserExist.isPasswordCorrect(password);
  if (!isPassCorrect) {
    const error = createHttpError(400, "password is incorrect.");
    return next(error);
  }

  const token = isUserExist.generateToken();
  res.cookie("token", token, { httpOnly: true, secure: true });

  const user = {
    _id: isUserExist._id,
    username: isUserExist.username,
    email: isUserExist.email,
    avatar: isUserExist.avatar,
  };

  res.status(200).json({
    message: "logged in successfully...",
    success: true,
    data: user,
  });
};

export default userLogin;
