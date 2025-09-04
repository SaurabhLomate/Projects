import { Request, NextFunction, Response } from "express";

const registerBook = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies.token;
  // console.log(req.cookies);

  res.status(201).json({ cookie });
};

export default registerBook;
