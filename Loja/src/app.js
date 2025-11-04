"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = require("./utils/validateEnv");
dotenv_1.default.config();
const app = (0, express_1.default)();
const env = (0, validateEnv_1.validateEnv)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} rodando: http://localhost:${env.PORT}`);
});
exports.default = app;
