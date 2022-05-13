import express, { Request, Response } from 'express';
import { UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../helpers/verifyAuthToken';

const store = new UserStore();
const JWT_SECRET = process.env.JWT_SECRET!;

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(Number(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = await store.create(req.body);
    const token = jwt.sign({ user: user }, JWT_SECRET);
    res.json({ token: token });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await store.authenticate(email, password);
    const token = jwt.sign({ user: user }, JWT_SECRET);
    res.json({ token: token });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user = await store.update(Number(req.params.id), req.body);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user = await store.destroy(Number(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const user_route = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/users/login', authenticate);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default user_route;
