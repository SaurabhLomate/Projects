import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model.js";
import createHttpError from "http-errors";
import redis from "../../config/redis.js";

const bookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    if (!bookId) {
      const error = createHttpError(400, "invalid book id");
      return next(error);
    }
    // ! redis implementation
    let book = await redis.get(`book:${bookId}`);
    if (book) {
      book = JSON.parse(book);
    } else {
      book = await Book.findOne({ _id: bookId });

      if (!book) {
        const error = createHttpError(400, "invalid book id");
        return next(error);
      }
      await redis.setex(`book:${bookId}`, 60, JSON.stringify(book));
    }

    res.status(200).json({
      message: "fetched book successfully..",
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    const err = createHttpError(400, "error occured while fetching book");
    return next(err);
  }
};

export default bookById;
