import { Request, Response } from "express";

const userRegister = (req: Request, res: Response) => {
  res.status(201).json({ message: "register controller" });
};

export default userRegister;
