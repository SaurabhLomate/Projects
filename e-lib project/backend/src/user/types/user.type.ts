import type { Document } from "mongoose";

export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateToken: () => string;
}
