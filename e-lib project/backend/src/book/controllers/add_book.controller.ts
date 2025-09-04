import { Request, NextFunction, Response } from "express";
import createHttpError from "http-errors";
import Book from "../models/book.model.js";
import cloudinary_upload from "../../config/cloudinary.js";

const registerBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    return next(createHttpError(400, "login or signup first"));
  }
  // console.log(await req.body);

  const { title, genre } = req.body;

  if (!title || !genre) {
    const error = createHttpError(400, "all fields are required");
    return next(error);
  }

  // multer
  // Access individual files uploaded using multer fields
  // Example: multer.fields([{ name: 'coverImage' }, { name: 'file' }])
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coverImage = files?.coverImage?.[0];
  const pdf_file = files?.file?.[0];

  if (
    coverImage.mimetype !== "image/jpeg" ||
    pdf_file.mimetype !== "application/pdf"
  ) {
    const error = createHttpError(400, "Invalid type of files ");
    return next(error);
  }
  // upload coverImage and file to cloudinary

  const cloud_coverImage = await cloudinary_upload(coverImage.path, "image");
  if (!cloud_coverImage) {
    const error = createHttpError(
      400,
      "unable to upload coverImage on cloudinary"
    );
    return next(error);
  }

  const cloud_pdf = await cloudinary_upload(pdf_file.path, "raw");
  if (!cloud_pdf) {
    const error = createHttpError(
      400,
      "unable to upload pdf file on cloudinary"
    );
    return next(error);
  }

  const uploaded_book = await Book.create({
    title,
    author: user._id,
    genre,
    coverImage: cloud_coverImage.secure_url,
    file: cloud_pdf.secure_url,
  });

  res.status(201).json({
    message: "book uploaded successfully..",
    success: true,
    data: uploaded_book,
  });
};

export default registerBook;
