import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model.js";

/**
 * take info from req.body
 * validate info
 * check if user already exist with email
 * if yes give error
 * if no hash password and register user
 * generate token
 */
const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const error = createHttpError(400, "please pass all fields");
    return next(error);
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    const error = createHttpError(400, "user already exist with this email");
    return next(error);
  }

  // console.log(req.file);
  let user;
  if (req.file && req.file.path !== "") {
    const avatar = req.file.path;

    // cloudinary

    user = await User.create({ username, email, password, avatar });
  } else {
    user = await User.create({ username, email, password });
  }

  const created_user = await User.findById(user._id).select("-password");
  if (!created_user) {
    const error = createHttpError(
      401,
      "error while registering. please try again"
    );
    return next(error);
  }

  const jwt_token = await created_user?.generateToken();
  res.cookie("token", jwt_token, { httpOnly: true, secure: true });

  res.status(201).json({
    message: "register controller",
    success: true,
    data: created_user,
  });
};

export default userRegister;
