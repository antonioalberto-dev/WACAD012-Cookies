import { Router } from "express";
import { signupForm } from "./auth.controller";

const router = Router();

router.get("/signup", signupForm);
router.post("/signup", signupForm);

export default router;
