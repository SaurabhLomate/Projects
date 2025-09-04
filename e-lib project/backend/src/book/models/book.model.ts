import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";
import { Book } from "../types/book.types.js";

const bookSchema: Schema<Book> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book =
  (mongoose.models.Book as Model<Book>) || model<Book>("Book", bookSchema);

export default Book;
