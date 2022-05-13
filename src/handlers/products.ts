import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import verifyAuthToken from '../helpers/verifyAuthToken';

const store = new ProductStore();

function errorText(e: string | Error) {
  if (typeof e === 'string') {
    return e.toUpperCase();
  } else if (e instanceof Error) {
    return e.message;
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(Number(req.params.id));
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: errorText(e as string | Error) });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product = await store.update(Number(req.params.id), req.body);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: errorText(e as string | Error) });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const product = await store.delete(Number(req.params.id));
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: errorText(e as string | Error) });
  }
};

const product_route = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default product_route;
