import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Book from "../models/book.model.js";

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * get id from params
   * find book by id in db
   * if exists store it in redis for 60 seconds
   * create a route for undo the deletion
   * delete book
   */
  try {
    const _id = req.params?.id;
    if (!_id) {
      const err = createHttpError(400, "invalid id.");
      return next(err);
    }

    const deleted_book = await Book.deleteOne({ _id });

    const book = await Book.findById(_id);
    if (book) {
      const err = createHttpError(
        400,
        "unable to delete book. please try again !"
      );
      return next(err);
    }

    res.status(200).json({
      message: "book deleted successfully...",
      success: true,
      data: deleted_book,
    });
  } catch (error) {
    console.log(error);
    const err = createHttpError(
      400,
      "unable to delete book. please try again!"
    );
    return next(err);
  }
};

export default deleteBook;
