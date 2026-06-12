import { Router } from "express";
import { login, logout } from "../controllers/loginController.js";

const router = Router();

router.post("/login", login);
router.post("/logout/:id", logout);

export default router;
