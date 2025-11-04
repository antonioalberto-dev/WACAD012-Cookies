import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidV4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

import { createProduct, getProductById, getProducts, removeProduct, updateProduct } from "./product.service";
import { CreateProductDto } from "./product.types";
import productSchema from "./product.schema";
import validador from "../../utils/validador";

const index = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.render("products/index", { products });
}

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("products/create");
  } else {
    try {
      const errors = validador(productSchema, req.body);

      if (Object.keys(errors).length > 0 || !req.files || !req.files.image) {
        if (!req.files || !req.files.image) {
          errors["image"] = "Imagem é obrigatória.";
        }
        console.log(errors);
        return res.render("products/create", {
          product: req.body,
          errors
        });
      }

      const image = req.files.image as UploadedFile;

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.render("products/create", {
          error: "Formato de imagem inválido. Use JPG, PNG ou GIF.",
          formData: req.body
        });
      }

      const publicFolder = path.join(process.cwd(), 'public');
      const imageDir = path.join(publicFolder, 'img', 'product');

      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      const imagePath = `img/product/${uuidV4()}-${image.name}`;
      const fullImagePath = path.join(publicFolder, imagePath);

      await image.mv(fullImagePath);

      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: parseInt(req.body.stock),
        image: imagePath,
      };

      await createProduct(product);

      res.redirect("/products");

    } catch (error) {
      console.error(error);
      res.render("products/create", {
        error: "Erro interno do servidor. Tente novamente.",
        formData: req.body
      });
    }
  }
}

const read = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório." });
    }

    const product = await getProductById(id);

    const quantityArray = Array.from({ length: 20 }, (value, index) => index);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.render("products/read", { product, quantityArray });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "ID do produto é obrigatório." });
  }

  if (req.method === "GET") {
    try {
      const product = await getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }

      return res.render("products/update", { product });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produto." });
    }
  } else {
    try {
      const { _method, ...bodyData } = req.body;

      const errors = validador(productSchema, bodyData);

      if (Object.keys(errors).length > 0) {
        const product = await getProductById(id);
        return res.render("products/update", {
          product: { ...product, ...bodyData },
          errors
        });
      }

      const productData: Partial<CreateProductDto> = {
        name: bodyData.name,
        description: bodyData.description,
        price: bodyData.price,
        stock: parseInt(bodyData.stock),
      };

      if (req.files && req.files.image) {
        const image = req.files.image as UploadedFile;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(image.mimetype)) {
          const product = await getProductById(id);
          return res.render("products/update", {
            product: { ...product, ...bodyData },
            errors: { image: "Formato de imagem inválido. Use JPG, PNG ou GIF." }
          });
        }

        const publicFolder = path.join(process.cwd(), 'public');
        const imageDir = path.join(publicFolder, 'img', 'product');

        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }

        const imagePath = `img/product/${uuidV4()}-${image.name}`;
        const fullImagePath = path.join(publicFolder, imagePath);

        await image.mv(fullImagePath);

        const oldProduct = await getProductById(id);
        if (oldProduct && oldProduct.image) {
          const oldImagePath = path.join(publicFolder, oldProduct.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        productData.image = imagePath;
      }

      await updateProduct(id, productData);

      res.redirect(`/products/read/${id}`);

    } catch (error) {
      console.error(error);
      const product = await getProductById(id);
      const { _method, ...bodyData } = req.body;
      res.render("products/update", {
        product: { ...product, ...bodyData },
        errors: { general: "Erro interno do servidor. Tente novamente." }
      });
    }
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({ msg: "ID do produto é obrigatório." });

  try {
    const product = await removeProduct(id);
    res.status(200).json({ msg: "Produto removido com sucesso.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, success: false });
  }
}

export default { index, read, create, update, remove };