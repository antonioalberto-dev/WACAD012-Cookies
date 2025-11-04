import { Product } from "../../generated/prisma";

export type CreateProductDto = Pick<Product, "name" | "price" | "description" | "image" | "stock">;
