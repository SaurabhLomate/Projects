import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Book from "../models/book.model.js";
import cloudinary_upload, {
  deleteCloudinary,
  deleteCloudinaryRawFiles,
} from "../../config/cloudinary.js";

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params?.bookId;
    const fetched_book = await Book.findOne({ _id: bookId });
    if (!fetched_book) {
      const error = createHttpError(400, "book is not available of this id");
      return next(error);
    }

    // check user id and author id
    if (
      fetched_book.author.toString() !== (req.user?._id!.toString() as string)
    ) {
      const error = createHttpError(
        400,
        "you are unauthorized to update this book"
      );
      return next(error);
    }

    const { title, genre } = req.body;

    // handle files
    const files = req.files;

    let multer_coverImage;
    let multer_file_pdf;

    if (files && !Array.isArray(files)) {
      multer_coverImage = files.coverImage?.[0];
      multer_file_pdf = files.file?.[0];
    }

    let cloud_coverImage;
    let cloud_file_pdf;
    if (multer_coverImage) {
      cloud_coverImage = await cloudinary_upload(
        multer_coverImage.path,
        "image",
        "cover_images"
      );
      if (cloud_coverImage) {
        const coverImage_folder = fetched_book.coverImage.split("/").splice(-2);
        const coverImage_name = coverImage_folder[1].split(".")[0];
        const public_id = `${coverImage_folder[0]}/${coverImage_name}`;

        await deleteCloudinary(public_id);
      }
    }

    if (multer_file_pdf) {
      cloud_file_pdf = await cloudinary_upload(
        multer_file_pdf.path,
        "raw",
        "book_pdfs"
      );
      if (cloud_file_pdf) {
        const pdf_file_folder = fetched_book.file.split("/").splice(-2);
        // const pdf_file_name = pdf_file_folder[1].split(".")[0];
        const public_id = `${pdf_file_folder[0]}/${pdf_file_folder[1]}`;

        //? delete raw files from cloudinary

        await deleteCloudinaryRawFiles(public_id);
        // console.log("file_res  ", file_res);
      }
    }

    const updated_book = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        title: title ? title : fetched_book.title,
        genre: genre ? genre : fetched_book.genre,
        coverImage: multer_coverImage
          ? cloud_coverImage?.secure_url
          : fetched_book.coverImage,
        file: multer_file_pdf ? cloud_file_pdf?.secure_url : fetched_book.file,
      }
    );
    res.json({
      message: "successfully updated the book",
      success: true,
      data: updated_book,
    });
  } catch (err) {
    console.log(err);
    const error = createHttpError(
      500,
      "something went wrong while updating book "
    );
    return next(error);
  }
};

export default updateBook;
