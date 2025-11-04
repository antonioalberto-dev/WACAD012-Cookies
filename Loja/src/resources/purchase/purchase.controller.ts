import { Request, Response } from "express";
import { findItemsFromPurchaseCart } from "./purchase.service";

const cart = async (req: Request, res: Response) => {
  try {
    const guestPurchaseId = req.session.guestPurchaseId;
    if (!guestPurchaseId) {
      return res.status(400).json({ msg: 'Sessão inválida' });
    }

    const cart = await findItemsFromPurchaseCart(guestPurchaseId);
    if (!cart) throw new Error('Carrinho de compras não existe');

    const totalPrice = cart.items.reduce((total, item) => 
       total + item.quantity * Number(item.product.price), 0
    );

    res.render("purchase/cart", { cartItems: cart?.items, totalPrice });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao carregar o carrinho de compras' });
  }
};

export default { cart };