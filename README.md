# ecommerce-website-restful-api

A RESTful API created with node, express and Postgres. The API allows creation of users, products and orders. Every user can make orders and add products to these orders.

## Setup

1.  Install dependencies:
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

## Usage

    ## Users

    ### Create user

    POST /users

    Body:
    ```
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "
        "password": "
    }
    ```

    Response:
    ```
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
    }

    ```

    ### Get user by id

    GET /users/:id

    Response:
    ```
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "
        "password": "
    }
    ```
