import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../helpers/verifyAuthToken';
import getErrorMessage from '../helpers/getErrorMessage';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(Number(req.params.id));
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = await store.create(req.body);
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await store.getOrdersByUserId(Number(req.params.id));
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const getOrdersByStatus = async (req: Request, res: Response) => {
  try {
    const orders = await store.getOrdersByStatus(req.params.status);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.addProductToOrder(
      Number(req.params.id),
      Number(req.body.quantity),
      Number(req.body.productId)
    );
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order = await store.update(Number(req.params.id), req.body);
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const order = await store.delete(Number(req.params.id));
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e as string | Error) });
  }
};

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/user/:id', verifyAuthToken, getOrdersByUserId);
  app.get('/orders/status/:status', verifyAuthToken, getOrdersByStatus);
  app.post('/orders/:id/addProduct', verifyAuthToken, addProductToOrder);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

export default order_routes;
