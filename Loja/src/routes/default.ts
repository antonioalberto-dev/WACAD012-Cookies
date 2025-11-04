import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/about', (req: Request, res: Response) => {
  res.send('Página sobre a aplicação ExpressTS');
});

router.get('/contact', (req: Request, res: Response) => {
  res.send('Página de contato');
});

router.post('/data', (req: Request, res: Response) => {
  res.json({
    message: 'Dados recebidos via POST',
    data: req.body
  });
});

export default router;
