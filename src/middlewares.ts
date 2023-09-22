import { NextFunction, Request, Response } from "express";
import { market } from "./database";


export const isProductNameExists = (req: Request, res: Response, next: NextFunction) => {
    const productExists = market.some((product) => product.name === req.body.name);

    if (productExists) {
      return res.status(409).json({ message: 'Product already registered.' });
    }

    next();
}

export const isIdExists = (req: Request, res: Response, next: NextFunction) => {
    const requestedProductId = Number(req.params.id);

    const product = market.find((product) => product.id === requestedProductId);

    if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

    next();
}