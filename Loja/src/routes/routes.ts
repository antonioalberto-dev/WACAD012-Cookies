import { Router } from 'express';
import mainRouter from '../resources/main/main.router';
import productRouter from '../resources/product/product.router';
import purchaseItemRouter from '../resources/purchaseItem/purchaseItem.router';
import purchaseRouter from '../resources/purchase/purchase.router';
import authRouter from '../resources/auth/auth.router';

const router = Router();

router.use(mainRouter);

router.use("/products", productRouter);
router.use("/purchaseItem", purchaseItemRouter);
router.use("/purchase", purchaseRouter);
router.use(authRouter);

export default router;
