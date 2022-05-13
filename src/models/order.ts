import database from '../database';

export type order = {
  id: number;
  user_id: number;
  quantity: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<order[]> {
    try {
      const orders = await database.query('SELECT * FROM orders');
      return orders.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders: ${e}`);
    }
  }

  async show(id: number): Promise<order> {
    try {
      const order = await database.query('SELECT * FROM orders WHERE id = $1', [
        id,
      ]);
      return order.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch order: ${e}`);
    }
  }

  async create(order: order): Promise<order> {
    try {
      const { user_id, quantity, status } = order;
      const conn = await database.connect();
      const sql =
        'INSERT INTO orders (user_id, quantity, status) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [user_id, quantity, status]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create order: ${e}`);
    }
  }

  async getOrdersByUserId(user_id: number): Promise<order[]> {
    try {
      const orders = await database.query(
        'SELECT * FROM orders WHERE user_id = $1',
        [user_id]
      );
      return orders.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders: ${e}`);
    }
  }

  async getOrdersByStatus(status: string): Promise<order[]> {
    try {
      const orders = await database.query(
        'SELECT * FROM orders WHERE status = $1',
        [status]
      );
      return orders.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders: ${e}`);
    }
  }

  async addProductToOrder(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<order> {
    try {
      const conn = await database.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to add product to order: ${e}`);
    }
  }

  async update(id: number, order: order): Promise<order> {
    try {
      const { user_id, quantity, status } = order;
      const conn = await database.connect();
      const sql =
        'UPDATE orders SET user_id = $1, quantity = $2, status = $3 WHERE id = $4 RETURNING *';
      const result = await conn.query(sql, [user_id, quantity, status, id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to update order: ${e}`);
    }
  }

  async delete(id: number): Promise<order> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to delete order: ${e}`);
    }
  }
}
