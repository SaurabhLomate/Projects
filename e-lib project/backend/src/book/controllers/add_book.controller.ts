import { Request, NextFunction, Response } from "express";

const registerBook = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({});
};

export default registerBook;
