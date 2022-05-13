import database from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const products = await database.query('SELECT * FROM products');
      return products.rows;
    } catch (e) {
      throw new Error(`Failed to fetch products: ${e}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const product = await database.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );
      return product.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch product: ${e}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const { name, price, category } = product;
      const conn = await database.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create product: ${e}`);
    }
  }

  async update(id: number, product: Product): Promise<Product> {
    try {
      const { name, price, category } = product;
      const conn = await database.connect();
      const sql =
        'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
      const result = await conn.query(sql, [name, price, category, id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to update product: ${e}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to delete product: ${e}`);
    }
  }
}
