import { Router } from "express";
import { signupForm, loginForm, logout } from "./auth.controller";

const router = Router();

router.get("/signup", signupForm);
router.post("/signup", signupForm);

router.get("/login", loginForm);
router.post("/login", loginForm);

router.get("/logout", logout);

export default router;
