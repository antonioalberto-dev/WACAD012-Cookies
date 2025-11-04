import { Request, Response } from 'express'
import { AddItemToPurchaseCartDTO } from './purchaseItem.types';
import { findOrCreatePurchaseCart } from '../purchase/purchase.service';
import { addItemToPurchaseCart, increaseItemQuantity, decreaseItemQuantity } from './purchaseItem.services';

const add = async (req: Request, res: Response) => {
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity, 10);

  if (!productId) {
    return res.status(400).json({ msg: 'productId é obrigatório' });
  }

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ msg: 'quantidade inválida' });
  }

  const purchaseItem = {
    productId: productId,
    quantity: quantity
  } as AddItemToPurchaseCartDTO;

  try {
    const purchaseCart = await findOrCreatePurchaseCart();
    await addItemToPurchaseCart(purchaseItem, purchaseCart);
    res.redirect('/products');
  } catch (error) {
    console.log('Error finding or creating purchase cart:', error);

    if (error instanceof Error) {
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ msg: error.message });
      }
    }

    res.status(500).json({ msg: 'Erro ao adicionar item ao carrinho' });
  }

}
const remove = async (req: Request, res: Response) => { }

const increase = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, msg: 'ID do item é obrigatório' });
  }

  try {
    await increaseItemQuantity(id);
    res.status(200).json({ success: true, msg: 'Incremento com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
    res.status(500).json({ success: false, msg: 'Erro ao incrementar quantidade' });
  }
}

const decrease = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, msg: 'ID do item é obrigatório' });
  }

  try {
    await decreaseItemQuantity(id);
    res.status(200).json({ success: true, msg: 'Decremento com sucesso' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
    res.status(500).json({ success: false, msg: 'Erro ao decrementar quantidade' });
  }
}

export default { add, remove, increase, decrease };