import mongoose, { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { UserType } from "../types/user.type.js";

const userSchema: Schema<UserType> = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [5, "username should be at least 5 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [7, "email should be at least 7 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [4, "password must be at least 4 characters"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dcu3dqzfc/image/upload/v1756920241/a5rw9izetvdh97mbsdh1.webp",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await hash(this.password, 10);
    next();
  } catch (error) {
    console.log(`error occurred during hashing password ${error}`);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    console.log(`error occured during comparing password ${error}`);
  }
};

userSchema.methods.generateToken = function () {
  try {
    const payload: jwt.JwtPayload = {
      _id: this._id,
      username: this.username,
      email: this.email,
      avatar: this.avatar,
    };

    if (!config.jwt_secret_key) {
      throw new Error("JWT secret key is not defined in config.");
    }
    return jwt.sign(payload, config.jwt_secret_key, {
      expiresIn: "10d",
      algorithm: "HS256",
    });
  } catch (error) {
    console.log(`error occured during generating token ${error}`);
  }
};

const User =
  (mongoose.models.User as Model<UserType>) ||
  model<UserType>("User", userSchema);

export default User;
