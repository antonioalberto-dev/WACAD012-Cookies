import { Tecnologia } from "./helpersTypes";

export function listarTecnologias(tecnologias: Tecnologia[]): string {
  return tecnologias.map((tecnologia) => `<li>${tecnologia.name} - ${tecnologia.type}</li>`).join("");
}

export function formatPrice(price: number | string | any): string {
  let numericPrice: number;

  if (typeof price === 'number') {
    numericPrice = price;
  } else if (typeof price === 'string') {
    numericPrice = parseFloat(price);
  } else if (price && typeof price === 'object' && 'toNumber' in price) {
    numericPrice = price.toNumber();
  } else {
    numericPrice = Number(price);
  }

  return numericPrice.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function multiply(a: number | string | any, b: number | string | any): number {
  const numA = typeof a === 'number' ? a : parseFloat(String(a));
  const numB = typeof b === 'number' ? b : parseFloat(String(b));
  return numA * numB;
}

export function gt(a: number | string | any, b: number | string | any): boolean {
  const numA = typeof a === 'number' ? a : parseFloat(String(a));
  const numB = typeof b === 'number' ? b : parseFloat(String(b));
  return numA > numB;
}