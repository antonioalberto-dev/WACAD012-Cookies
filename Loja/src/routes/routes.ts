import { Router } from 'express';
import mainRouter from '../resources/main/main.router';
import productRouter from '../resources/product/product.router';
import purchaseItemRouter from '../resources/purchaseItem/purchaseItem.router';
import purchaseRouter from '../resources/purchase/purchase.router';

const router = Router();

router.use(mainRouter);

router.use("/products", productRouter);
router.use("/purchaseItem", purchaseItemRouter);
router.use("/purchase", purchaseRouter);

export default router;
