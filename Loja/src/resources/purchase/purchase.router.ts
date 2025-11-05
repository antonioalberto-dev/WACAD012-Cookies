import { Router } from "express";
import purchaseController from "./purchase.controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router = Router();

router.get("/cart", isAuthenticated, purchaseController.cart);

export default router;