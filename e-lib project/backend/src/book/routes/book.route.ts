import { Router } from "express";
import registerBook from "../controllers/add_book.controller.js";
import verifyUser from "../../middlewares/auth.middelware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/",
  verifyUser,
  upload.fields([
    { name: "coverImage" },
    { name: "file" }
  ]),
  registerBook
);

export default router;
