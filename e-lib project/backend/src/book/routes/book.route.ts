import { Router } from "express";
import registerBook from "../controllers/add_book.controller.js";
import verifyUser from "../../middlewares/auth.middelware.js";
import upload from "../../middlewares/multer.middleware.js";
import updateBook from "../controllers/update_book.controller.js";
import allBooks from "../controllers/get_all_books.controller.js";
import bookById from "../controllers/get_book_by_id.controller.js";

const router = Router();

router.get("/", allBooks);
router.get("/:bookId", bookById);

router.post(
  "/",
  verifyUser,
  upload.fields([{ name: "coverImage" }, { name: "file" }]),
  registerBook
);

router.patch(
  "/:bookId",
  verifyUser,
  upload.fields([{ name: "coverImage" }, { name: "file" }]),
  updateBook
);

export default router;
