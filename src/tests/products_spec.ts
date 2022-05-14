import { Product, ProductStore } from '../models/product';
import request from 'supertest';
import express from 'express';

const store = new ProductStore();
let createdProduct: Product;
const app = express();

describe('ProductStore', () => {
  describe('create', () => {
    it('should create a product', async () => {
      const product = await store.create({
        name: 'New Product',
        price: 100,
        category: 'Electronics',
      } as Product);

      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
      createdProduct = product;
    });

    it('should not create a product using the endpoint', async () => {
      request(app)
        .post('/products')
        .send({
          name: 'New Product',
          price: 100,
          category: 'Electronics',
        })
        .expect(200);
    });
  });
  describe('index', () => {
    it('should return all products', async () => {
      const products = await store.index();
      expect(products).toBeDefined();
      expect(products.length).toBeGreaterThan(0);

      const product = products[0];
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
    });

    it('should return a product by id', async () => {
      const product = await store.show(createdProduct.id);
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
    });
  });
  describe('show', () => {
    it('should return a product', async () => {
      const product = await store.show(createdProduct.id);
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
    });

    it('should return a product using the endpoint', async () => {
      request(app).get('/products/1').expect(200);
    });
  });
  describe('update', () => {
    it('should update a product', async () => {
      const product = await store.update(createdProduct.id, {
        name: 'Updated Product',
        price: 200,
        category: 'Electronics',
      } as Product);
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
    });

    it('should update a product using the endpoint', async () => {
      request(app)
        .put('/products/1')
        .send({
          name: 'Updated Product',
          price: 200,
          category: 'Electronics',
        })
        .expect(200);
    });
  });
  describe('delete', () => {
    it('should delete a product', async () => {
      await store.delete(createdProduct.id);
      const product = await store.show(createdProduct.id);
      expect(product).toBeUndefined();
    });

    it('should delete a product using the endpoint', async () => {
      request(app).delete('/products/1').expect(200);
    });
  });
});
