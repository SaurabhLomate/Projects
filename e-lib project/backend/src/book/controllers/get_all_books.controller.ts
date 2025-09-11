import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model.js";
import createHttpError from "http-errors";

const allBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    if (!books) {
      const error = createHttpError(400, "no books available");
      return next(error);
    }
    res.status(200).json({
      message: "fetched books successfully..",
      success: true,
      data: books,
    });
  } catch (error) {
    console.log(error);
    const err = createHttpError(400, "error occured while fetching books");
    return next(err);
  }
};

export default allBooks;
