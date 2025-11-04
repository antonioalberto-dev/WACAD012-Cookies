
import { Router } from 'express';
import loremRouter from './lorem';
import defaultRouter from './routes';

const router = Router();

router.use('/', defaultRouter);
router.use('/lorem', loremRouter);

export default router;
