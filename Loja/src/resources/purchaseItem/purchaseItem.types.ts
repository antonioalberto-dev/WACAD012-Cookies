import { PurchaseItem } from "../../generated/prisma";

export type AddItemToPurchaseCartDTO = Pick<PurchaseItem, 'productId' | 'quantity'>;