import { User, UserStore } from '../models/user';
import request from 'supertest';
import express from 'express';

const store = new UserStore();
const app = express();

describe('UserStore', () => {
  describe('create', () => {
    it('should create a user', async () => {
      const user = await store.create({
        email: 'JohnDoe@email.com',
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

      const user2 = await store.create({
        email: 'Viego@email.com',
        first_name: 'Viego',
        last_name: 'Doe',
        password: 'password',
      } as User);
      expect(user2).toBeDefined();
      expect(user2.id).toBeDefined();
      expect(user2.email).toBeDefined();
      expect(user2.first_name).toBeDefined();
      expect(user2.last_name).toBeDefined();
      expect(user2.password).toBeDefined();
    });

    it('should not create a user using the endpoint', async () => {
      request(app)
        .post('/users')
        .send({
          email: 'JohnDoe2@email.com',
          first_name: 'John',
          last_name: 'Doe',
          password: 'password',
        })
        .expect(200);
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

    it('should return all users using the endpoint', async () => {
      request(app).get('/users').expect(200);
    });
  });

  describe('show', () => {
    it('should return a user', async () => {
      const user = await store.show(2);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });

    it('should return a user using the endpoint', async () => {
      request(app).get('/users/2').expect(200);
    });
  });

  describe('authenticate', () => {
    it('should authenticate a user', async () => {
      const user = await store.authenticate('JohnDoe@email.com', 'password');
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });

    it('should authenticate a user using the endpoint', async () => {
      request(app)
        .post('/users/authenticate')
        .send({
          email: 'JohnDoe@email.com',
          password: 'password',
        })
        .expect(200);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = await store.update(2, {
        email: 'JohnsDoe@email.com',
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

    it('should update a user using the endpoint', async () => {
      request(app)
        .put('/users/2')
        .send({
          email: 'JohnsDoe@email.com',
          first_name: 'newfirstname',
          last_name: 'newlastname',
          password: 'newpassword',
        })
        .expect(200);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = await store.destroy(2);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.password).toBeDefined();
    });

    it('should delete a user using the endpoint', async () => {
      request(app).delete('/users/2').expect(200);
    });
  });
});
