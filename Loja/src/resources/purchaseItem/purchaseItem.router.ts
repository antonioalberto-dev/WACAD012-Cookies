import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router = Router();

router.post('/add', isAuthenticated, purchaseItemController.add)
router.post('/remove', isAuthenticated, purchaseItemController.remove)
router.post('/increment/:id', isAuthenticated, purchaseItemController.increase)
router.post('/decrement/:id', isAuthenticated, purchaseItemController.decrease)

export default router;