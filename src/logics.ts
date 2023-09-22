import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const readProduct = (req: Request, res: Response) => {
  //// Calculando a soma dos preços de todos os produtos no market ////

  const total = market.reduce(
    (totalPrice, product) => totalPrice + product.price,
    0
  );

  //// Retornando um objeto com o total junto com a lista de produtos ////
  const response = {
    total,
    products: market,
  };

  return res.status(200).json(response);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price, weight, section, calories } = req.body as IProduct;

  // Encontrar o próximo ID disponível
  let maxProductId = 0;
  for (const product of market) {
    if (product.id > maxProductId) {
      maxProductId = product.id;
    }
  }

  const addToDays = 365;
  const createDate = new Date();
  const expirationDate = new Date(createDate);
  expirationDate.setDate(expirationDate.getDate() + addToDays);

  const newProduct: IProduct = {
    id: maxProductId + 1, // Usar o próximo ID disponível
    name,
    price,
    weight,
    calories,
    section,
    expirationDate,
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

export const getProductsId = (req: Request, res: Response) => {
  const requestedProductId = Number(req.params.id);

  const product = market.find((product) => product.id === requestedProductId);

  res.status(200).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const updateProductId = Number(req.params.id);
  const index = market.findIndex((product) => product.id === updateProductId);

  //// Verifica e atualiza as propriedades que foram fornecidas no corpo da solicitação ////

  if (req.body.name !== undefined) {
    market[index].name = req.body.name;
  }

  if (req.body.price !== undefined) {
    market[index].price = req.body.price;
  }

  if (req.body.weight !== undefined) {
    market[index].weight = req.body.weight;
  }

  if (req.body.calories !== undefined) {
    market[index].calories = req.body.calories;
  }

  // Adicionando um número fixo de dias atual //
  const addToDays = 365;
  const newExpirationDate = new Date();
  newExpirationDate.setDate(newExpirationDate.getDate() + addToDays);
  market[index].expirationDate = newExpirationDate;

  res.status(200).json(market[index]);
};

export const deleteProducts = (req: Request, res: Response) => {
  const deleteProductId = Number(req.params.id);
  const index = market.findIndex((product) => product.id === deleteProductId);

  market.splice(index, 1);

  return res.status(204).end();
};
