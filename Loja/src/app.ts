import express from 'express';
import dotenv from 'dotenv';
import { getEnv } from './utils/validateEnv';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import logger from './middlewares/logger';
import router from './routes';
import LogTipos from './middlewares/logTypes';
import setGuestPurchaseId from './middlewares/setGuestPurchaseId';
import setUserLocals from './middlewares/setUserLocals';

import { engine } from 'express-handlebars';

import fileUpload = require('express-fileupload');

dotenv.config();

const app = express();
const env = getEnv();

app.engine('handlebars', engine({
  helpers: require(`${process.cwd()}/build/views/helpers/helpers.js`),
  partialsDir: `${process.cwd()}/src/views/partials`
}));
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views`);

app.use(logger(LogTipos.COMPLETO));
app.use(cookieParser());
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 
  }
}));
app.use("/js", express.static(`${process.cwd()}/public/js`));
app.use("/css", express.static(`${process.cwd()}/public/css`));
app.use("/img", express.static(`${process.cwd()}/public/img`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: "Arquivo muito grande"
}));

app.use((req, res, next) => {
  const theme = req.cookies.theme || 'light';
  res.locals.theme = theme;
  next();
});

app.use(setGuestPurchaseId);
app.use(setUserLocals);

app.use(router);

app.listen(env.PORT, () => {
  console.log(`${env.APP_NAME} rodando: http://localhost:${env.PORT}`);
});

export default app;
