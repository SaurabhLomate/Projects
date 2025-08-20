import { Router } from "express";
import userRegister from "../controllers/user_register.controller.js";

const router = Router();

router.post("/register", userRegister);

export default router;
