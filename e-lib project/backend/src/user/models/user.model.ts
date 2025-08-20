import { compare, hash } from "bcryptjs";
import { Schema, model, models } from "mongoose";
import type { Model, Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
}
const userSchema: Schema<User> = new Schema(
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
      default: "/images/image_placeholder.png",
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
    await compare(password, this.password);
  } catch (error) {
    console.log(`error occured during comparing password ${error}`);
  }
};

const User = (models.User as Model<User>) || model<User>("User", userSchema);

export default User;
