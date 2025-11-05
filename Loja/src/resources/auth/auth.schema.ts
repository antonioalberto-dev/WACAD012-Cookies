import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Nome deve ser um texto",
      "string.empty": "Nome é obrigatório",
      "string.min": "Nome deve ter no mínimo 3 caracteres",
      "string.max": "Nome deve ter no máximo 100 caracteres",
      "any.required": "Nome é obrigatório"
    }),
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      "string.base": "Email deve ser um texto",
      "string.empty": "Email é obrigatório",
      "string.email": "Email deve ser válido",
      "string.max": "Email deve ter no máximo 100 caracteres",
      "any.required": "Email é obrigatório"
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      "string.base": "Senha deve ser um texto",
      "string.empty": "Senha é obrigatória",
      "string.min": "Senha deve ter no mínimo 6 caracteres",
      "string.max": "Senha deve ter no máximo 255 caracteres",
      "any.required": "Senha é obrigatória"
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      "string.base": "Confirmação de senha deve ser um texto",
      "string.empty": "Confirmação de senha é obrigatória",
      "any.only": "As senhas não coincidem",
      "any.required": "Confirmação de senha é obrigatória"
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      "string.base": "Email deve ser um texto",
      "string.empty": "Email é obrigatório",
      "string.email": "Email deve ser válido",
      "string.max": "Email deve ter no máximo 100 caracteres",
      "any.required": "Email é obrigatório"
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.base": "Senha deve ser um texto",
      "string.empty": "Senha é obrigatória",
      "any.required": "Senha é obrigatória"
    })
});

export default signupSchema;
