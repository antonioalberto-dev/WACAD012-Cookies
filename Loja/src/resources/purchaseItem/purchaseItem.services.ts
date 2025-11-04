import { PrismaClient, Purchase, PurchaseItem } from "../../generated/prisma";
import { AddItemToPurchaseCartDTO } from "./purchaseItem.types";

const prisma = new PrismaClient();

export const addItemToPurchaseCart = async (
  purchaseItem: AddItemToPurchaseCartDTO,
  purchaseCart: Purchase
): Promise<PurchaseItem> => {

  const product = await prisma.product.findUnique({
    where: { id: purchaseItem.productId }
  });

  if (!product) {
    throw new Error(`Produto com ID ${purchaseItem.productId} não encontrado`);
  }

  return prisma.purchaseItem.upsert({
    where: {
      productId_purchaseId: {
        productId: purchaseItem.productId,
        purchaseId: purchaseCart.id,
      }
    },
    update: {
      quantity: {
        increment: purchaseItem.quantity
      }
    },
    create: {
      productId: purchaseItem.productId,
      purchaseId: purchaseCart.id,
      quantity: purchaseItem.quantity,
      price: product.price
    }
  });
};

export const increaseItemQuantity = async (purchaseItemId: string) => {
  return prisma.purchaseItem.update({
    where: {
      id: purchaseItemId
    }, 
    data: {
      quantity: {
        increment: 1
      }
    }
  });
}

export const decreaseItemQuantity = async (purchaseItemId: string) => {
  const item = await prisma.purchaseItem.findUnique({
    where: { id: purchaseItemId }
  });

  if (!item) {
    throw new Error('Item não encontrado no carrinho');
  }

  if (item.quantity <= 1) {
    return prisma.purchaseItem.delete({
      where: { id: purchaseItemId }
    });
  }

  return prisma.purchaseItem.update({
    where: { id: purchaseItemId },
    data: {
      quantity: {
        decrement: 1
      }
    }
  });
}