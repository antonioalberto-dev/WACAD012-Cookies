import { Request, Response, NextFunction } from 'express';
import fsPromise from 'fs/promises';
import { getEnv } from '../utils/validateEnv';
import LogTipos from './logTypes';

function logger(tipo: LogTipos) {
  const env = getEnv();
  const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Manaus' });
  if (tipo === LogTipos.COMPLETO) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const file = `${process.cwd()}/${env.LOGGER_DIR}/logs.txt`;
      await fsPromise.appendFile(file, `${timestamp}, ${req.method}, ${req.url}\n`);
      next();
    }
  } else {

    return async (req: Request, res: Response, next: NextFunction) => {
      const file = `${process.cwd()}/${env.LOGGER_DIR}/logs.txt`;
      await fsPromise.appendFile(file, `${timestamp}, ${req.method}, ${req.url}, ${req.httpVersion}, ${req.get('User-Agent')}\n`);
      next();
    }
  }
}

export default logger;
