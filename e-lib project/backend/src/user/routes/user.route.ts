import { Router } from "express";
import userRegister from "../controllers/user_register.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import userLogin from "../controllers/user_login.controller.js";

const router = Router();

router.post("/register", upload.single("avatar"), userRegister);
router.post("/login", userLogin);
export default router;
