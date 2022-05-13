import { User, UserStore } from '../models/user';

const store = new UserStore();

describe('UserStore', () => {
  describe('create', () => {
    it('should create a user', async () => {
      const user = await store.create({
        email: 'sss@email.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
      } as User);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
  describe('index', () => {
    it('should return all users', async () => {
      const users = await store.index();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);

      const user = users[0];
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
  describe('show', () => {
    it('should return a user', async () => {
      const user = await store.show(1);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
  describe('authenticate', () => {
    it('should authenticate a user', async () => {
      const user = await store.authenticate('email123@email.com', 'password');
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
});
