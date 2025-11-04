import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 40,
    min: 4
  }
});

router.get('/:num', (req: Request, res: Response) => {
  const num = parseInt(req.params.num, 10);
  if (isNaN(num) || num < 1 || num > 100) {
    return res.status(400).send('Informe um número válido');
  }
  const paragraphs = Array.from({ length: num }, () => lorem.generateParagraphs(1));
  res.send(`<div>${paragraphs.map(p => `<p>${p}</p>`).join('')}</div>`);
});

export default router;
