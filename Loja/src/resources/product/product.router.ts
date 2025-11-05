import { Router } from "express";
import productController from "./product.controller";
import isAuthenticated from "../../middlewares/isAuthenticated";
import isAdmin from "../../middlewares/isAdmin";

const router = Router();

router.get("/", isAuthenticated, productController.index);

router.get("/create", isAuthenticated, isAdmin, productController.create);

router.post("/create", isAuthenticated, isAdmin, productController.create);

router.get("/read/:id", isAuthenticated, productController.read);

router.get("/update/:id", isAuthenticated, isAdmin, productController.update);

router.post("/update/:id", isAuthenticated, isAdmin, productController.update);

router.put("/update/:id", isAuthenticated, isAdmin, productController.update);

router.delete("/delete/:id", isAuthenticated, isAdmin, productController.remove);

export default router;