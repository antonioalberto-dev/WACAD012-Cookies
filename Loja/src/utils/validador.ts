import { Schema } from "joi";

function validador<T>(schema: Schema, data: T) {
  const objErros: Record<string, string> = {};

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    console.log(error);
    error.details.forEach((e) => {
      objErros[e.path.join(".")] = e.message.replace(/"/g, '');
    });
  }
  return objErros;
}

export default validador;