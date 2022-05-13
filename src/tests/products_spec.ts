import { Product, ProductStore } from '../models/product';

const store = new ProductStore();
let createdProduct: Product;

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
  });
  describe('show', () => {
    it('should return a product', async () => {
      const product = await store.show(createdProduct.id);
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
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
  });
  describe('delete', () => {
    it('should delete a product', async () => {
      await store.delete(createdProduct.id);
      const product = await store.show(createdProduct.id);
      expect(product).toBeUndefined();
    });
  });
});
