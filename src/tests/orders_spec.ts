import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';

const store = new OrderStore();

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
  });
});