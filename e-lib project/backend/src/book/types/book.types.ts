import type { Document, Types } from "mongoose";
export interface Book extends Document {
  _id: string;
  title: string;
  author: Types.ObjectId;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}
