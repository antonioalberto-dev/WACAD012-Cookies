import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.redirect('/products');
}

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', { message: 'Express + Handlebars!' });
}

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', { poweredByNodejs: true });
}

const hb3 = (req: Request, res: Response) => {
  const professores = [
    { nome: 'João Serrao', materia: 'Engenharia de Software I' },
    { nome: 'Maria Silva', materia: 'Banco de dados' },
    { nome: 'Pedro Santos', materia: 'Teste de Software' },
    { nome: 'Ana Oliveira', materia: 'Programação Web' },
    { nome: 'Lucas Pereira', materia: 'Redes de Computadores' }
  ];
  res.render('main/hb3', { professores });
}

const hb4 = (req: Request, res: Response) => {
  const techs = [
    { name: 'NodeJS', type: 'Runtime', poweredByNodejs: true },
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Template Engine', poweredByNodejs: false },
    { name: 'TypeScript', type: 'Language', poweredByNodejs: true }
  ];
  res.render('main/hb4', { techs });
}

export default { hb1, hb2, hb3, hb4, index };