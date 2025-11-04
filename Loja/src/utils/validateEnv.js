"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
function validateEnv() {
    const { PORT, APP_NAME } = process.env;
    if (!PORT) {
        throw new Error('A variável de ambiente PORT é obrigatória');
    }
    const portNumber = Number(PORT);
    if (isNaN(portNumber) || portNumber <= 0 || portNumber > 65535) {
        throw new Error('PORT deve ser um numero valido entre 1 e');
    }
    if (!APP_NAME || APP_NAME.trim().length === 0) {
        throw new Error('APP_NAME é obrigatoria e não pode ser vazia');
    }
    return {
        PORT: portNumber,
        APP_NAME: APP_NAME.trim()
    };
}
