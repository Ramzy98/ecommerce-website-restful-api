import database from '../database';
import bcrypt from 'bcrypt';

const { SALT_ROUNDS, PEPPER } = process.env;

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const users = await database.query('SELECT * FROM users');
      return users.rows;
    } catch (e) {
      throw new Error(`Failed to fetch users: ${e}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const user = await database.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      return user.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch user: ${e}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const { first_name, last_name, email, password } = user;
      const conn = await database.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const hashedPassword = bcrypt.hashSync(
        password + PEPPER,
        Number(SALT_ROUNDS)
      );
      const result = await conn.query(sql, [
        first_name,
        last_name,
        email,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create user: ${e}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User> {
    try {
      const conn = await database.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await conn.query(sql, [email]);
      conn.release();
      const user = result.rows[0];

      if (user && bcrypt.compareSync(password + PEPPER, user.password)) {
        return user;
      }

      throw new Error('Invalid credentials');
    } catch (e) {
      throw new Error(`Failed to authenticate user: ${e}`);
    }
  }

  async update(id: number, user: User): Promise<User> {
    const { first_name, last_name, email, password } = user;
    const conn = await database.connect();
    const sql =
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';

    const result = await conn.query(sql, [
      first_name,
      last_name,
      email,
      password,
      id,
    ]);
    conn.release();
    return result.rows[0];
  }

  async destroy(id: number): Promise<User> {
    try {
      const conn = await database.connect();
      const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to delete user: ${e}`);
    }
  }
}
