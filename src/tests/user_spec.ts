import { User, UserStore } from '../models/user';

const store = new UserStore();
let createdUser: User;

describe('UserStore', () => {
  describe('create', () => {
    it('should create a user', async () => {
      const user = await store.create({
        email: 'new@email.com',
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
      createdUser = user;
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
      const user = await store.show(createdUser.id);
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
      const user = await store.authenticate(createdUser.email, 'password');
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = await store.update(createdUser.id, {
        email: createdUser.email,
        first_name: 'newfirstname',
        last_name: 'newlastname',
        password: 'newpassword',
      } as User);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = await store.destroy(createdUser.id);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });
  });
});
