import { Router } from "express";
import registerBook from "../controllers/add_book.controller.js";

const router = Router();

router.post("/", registerBook);

export default router;
