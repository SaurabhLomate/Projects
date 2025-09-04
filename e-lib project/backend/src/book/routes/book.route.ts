import { Router } from "express";
import registerBook from "../controllers/add_book.controller.js";
import verifyUser from "../../middlewares/auth.middelware.js";

const router = Router();

router.post("/", verifyUser, registerBook);

export default router;
