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

const User = (models.User as Model<User>) || model<User>("User", userSchema);

export default User;
