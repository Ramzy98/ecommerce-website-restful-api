import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const ENV = process.env.NODE_ENV;
let database!: Pool;

const {
  POSTGRES_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_DB_NAME_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

if (ENV === 'test') {
  database = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_NAME_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === 'dev') {
  database = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default database;
