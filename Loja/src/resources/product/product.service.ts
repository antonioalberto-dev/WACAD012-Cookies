import { PrismaClient, Product } from "../../generated/prisma";
import { CreateProductDto } from "./product.types";

const prisma = new PrismaClient();

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany({
    where: { status: 1 }
  });
}

export async function createProduct(product: CreateProductDto): Promise<Product> {
  return await prisma.product.create({
    data: {
      ...product,
      status: 1,
    }
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { id, status: 1 }
  });
  return product;
}

export async function removeProduct(id: string): Promise<Product | null> {
  return prisma.product.update({ where: { id }, data: { status: 0 } });

}

export async function updateProduct(id: string, product: Partial<CreateProductDto>): Promise<Product | null> {
  return prisma.product.update({
    where: { id },
    data: product
  });
}