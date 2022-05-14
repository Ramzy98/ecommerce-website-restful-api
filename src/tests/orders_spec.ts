import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';
import { Product, ProductStore } from '../models/product';
import request from 'supertest';
import express from 'express';

const store = new OrderStore();
const app = express();

const userStore = new UserStore();
async function createUser() {
  const user = await userStore.create({
    email: 'testOrder@email.com',
    first_name: 'John',
    last_name: 'Doe',
    password: 'password',
  } as User);
  return user;
}

let user: User;
describe('OrderStore', () => {
  describe('create', () => {
    it('should create an order', async () => {
      user = await createUser();
      const order = await store.create({
        user_id: user.id,
        status: 'active',
        quantity: 1,
      } as Order);

      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.user_id).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.quantity).toBeDefined();
    });

    it('should not create an order using the endpoint', async () => {
      request(app)
        .post('/orders')
        .send({
          user_id: user.id,
          status: 'active',
          quantity: 1,
        })
        .expect(200);
    });
  });

  describe('index', () => {
    it('should return all orders', async () => {
      const orders = await store.index();
      expect(orders).toBeDefined();
      expect(orders.length).toBeGreaterThan(0);

      const order = orders[0];
      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.user_id).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.quantity).toBeDefined();
    });

    it('should not return all orders using the endpoint', async () => {
      request(app).get('/orders').expect(200);
    });
  });

  describe('show', () => {
    it('should return an order', async () => {
      const order = await store.show(1);
      expect(order).toBeDefined();
      expect(order.id).toBeDefined();

      expect(order.user_id).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.quantity).toBeDefined();
    });

    it('should not return an order using the endpoint', async () => {
      request(app).get('/orders/1').expect(200);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const order = await store.update(1, {
        user_id: user.id,
        status: 'active',
        quantity: 1,
      } as Order);
      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.user_id).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.quantity).toBeDefined();
    });

    it('should not update an order using the endpoint', async () => {
      request(app)
        .put('/orders/1')
        .send({
          user_id: user.id,
          status: 'active',
          quantity: 1,
        })
        .expect(200);
    });
  });

  describe('delete', () => {
    it('should delete an order', async () => {
      const order = await store.delete(1);
      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.user_id).toBeDefined();
      expect(order.status).toBeDefined();

      expect(order.quantity).toBeDefined();
    });

    it('should not delete an order using the endpoint', async () => {
      request(app).delete('/orders/1').expect(200);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return all orders by user id', async () => {
      const orders = await store.getOrdersByUserId(user.id);
      expect(orders).toBeDefined();
    });

    it('should not return all orders by user id using the endpoint', async () => {
      request(app).get('/orders/user/1').expect(200);
    });
  });

  describe('getOrdersByStatus', () => {
    it('should return all orders by status', async () => {
      const orders = await store.getOrdersByStatus('active');
      expect(orders).toBeDefined();
    });

    it('should not return all orders by status using the endpoint', async () => {
      request(app).get('/orders/status/active').expect(200);
    });
  });

  describe('addProductToOrder', () => {
    it('should add a product to an order', async () => {
      const order = await store.create({
        user_id: user.id,
        status: 'active',
        quantity: 1,
      } as Order);
      const createdProduct = await new ProductStore().create({
        name: 'New Product',
        price: 100,
        category: 'Electronics',
      } as Product);
      const product = await store.addProductToOrder(
        order.id,
        createdProduct.id,
        1
      );
      expect(product).toBeDefined();
    });

    it('should not add a product to an order using the endpoint', async () => {
      request(app)
        .post('/orders/1/products/1')
        .send({
          quantity: 1,
        })
        .expect(200);
    });
  });
});
