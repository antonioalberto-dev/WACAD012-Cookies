import { PrismaClient, Purchase } from "../../generated/prisma";
import { PurchaseStatus } from "./purchase.constants";

const prisma = new PrismaClient();

export const findOrCreatePurchaseCart = async (guestPurchaseId: string): Promise<Purchase> => {
  let purchase = await prisma.purchase.findFirst({
    where: {
      status: PurchaseStatus.open,
      guestPurchaseId: guestPurchaseId,
    },
  });

  if (!purchase)
    purchase = await prisma.purchase.create({
      data: { 
        status: PurchaseStatus.open,
        guestPurchaseId: guestPurchaseId,
      },
    });
  return purchase;
}

export const findItemsFromPurchaseCart = async (guestPurchaseId: string) => {
  const cart = await findOrCreatePurchaseCart(guestPurchaseId);

  return prisma.purchase.findFirst({
    where: { id: cart.id },
    include: {
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
            },
          }
        }
      }
    },
  });
}