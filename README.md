# ecommerce-website-restful-api

A RESTful API created with node, express and Postgres. The API allows creation of users, products and orders. Every user can make orders and add products to these orders.

## Setup

1.  Installation Instructions :
    1.1. npm install
    1.2. yarn install

2.  Run the server:
    2.1. npm run start
    2.2. yarn start

3.  Run the tests:
    3.1. npm run test
    3.2. yarn test

4.  Run the build:
    4.1. npm run build
    4.2. yarn build

5.  You must have a .env file with the following variables:
    5.1. PORT
    5.2. POSTGRES_HOST
    5.3. POSTGRES_USER
    5.4. POSTGRES_PASSWORD
    5.5. POSTGRES_DB_NAME
    5.6 POSTGRES_DB_NAME_TEST
    5.7 NODE_ENV
    5.8 BCRYPT_PASSWORD
    5.9 SALT_ROUNDS
    5.10 JWT_SECRET

## PORT NUMBERS

    - Node server is running on port 3000
    - Postgres is running on localhost

## SERVER SETUP

    - After installing the dependencies, run the server with the command:
        - npm run start
        - yarn start

    - After running the server, you can navigate to the following URL:
        - http://localhost:3000/

    - You can also run the tests with the command:
        - npm run test
        - yarn test

## POSTGRES SETUP

    - Create a new database called ecommerce_db for development.
    - Create a new database called ecommerce_db_test for testing.
    - then migrate the database with the command:
        - db:migrate up

## Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(255)
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL
);


CREATE TABLE users_products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL
);
```

## API ENDPOINTS

    Users

    Create user

    POST /users

    Body:
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "
        "password": "
    }

    Response:
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
    }


    ### Get user by id

    GET /users/:id

    Response:
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "
        "password": "
    }


    ### Get all users

    GET /users

    ### Update user

    PUT /users/:id

    Body:
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "
        "password": "
    }

    ### Delete user

    DELETE /users/:id

    Product

    Create product

    POST /products

    Body:
    {
        "name": "Product Name",
        "price": "100",
        "category": "Category"
    }

    Response:
    {
        "id": 1,
        "name": "Product Name",
        "price": "100",
        "category": "Category"
    }

    ### Get product by id

    GET /products/:id

    Response:
    {
        "id": 1,
        "name": "Product Name",
        "price": "100",
        "category": "Category"
    }


    ### Get all products

    GET /products

    ### Update product

    PUT /products/:id

    Body:
    {
        "name": "Product Name",
        "price": "100",
        "category": "Category"
    }

    ### Delete product

    DELETE /products/:id

    Order

    Create order

    POST /orders

    Body:
    {
        "product_id": "1",
        "quantity": "1",
        "user_id": "1",
        "status": "active"
    }

    Response:
    {
        "id": 1,
        "product_id": "1",
        "quantity": "1",
        "user_id": "1",
        "status": "active"
    }

    ### Get order by id

    GET /orders/:id

    Response:
    {
        "id": 1,
        "product_id": "1",
        "quantity": "1",
        "user_id": "1",
        "status": "active"
    }


    ### Get all orders

    GET /orders

    ### Update order

    PUT /orders/:id

    Body:
    {
        "product_id": "1",
        "quantity": "1",
        "user_id": "1",
        "status": "active"
    }

    ### Delete order

    DELETE /orders/:id

    ### Add product to order

    POST /orders/:id/products

    Body:
    {
        "product_id": "1",
        "quantity": "1"
    }

    Response:
    {
        "id": 1,
        "product_id": "1",
        "quantity": "1",
        "user_id": "1",
        "status": "active"
    }
