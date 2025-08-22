import { Router } from "express";
import userRegister from "../controllers/user_register.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), userRegister);

export default router;
