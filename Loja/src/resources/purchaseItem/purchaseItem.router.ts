import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller";

const router = Router();

router.post('/add', purchaseItemController.add)
router.post('/remove', purchaseItemController.remove)
router.post('/increment/:id', purchaseItemController.increase)
router.post('/decrement/:id', purchaseItemController.decrease)

export default router;