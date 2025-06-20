# Spare Task

## Table of Contents

- [Description](#description)
- [Stack Used](#stack-used)
- [Getting Started](#getting-started)
  - [Start with Docker](#to-start-the-project-in-a-docker-environment-development-mode-run)
  - [Start without Docker](#to-run-without-docker)
- [Tests](#tests)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
    - 1. Get a list of products
    - 2. Create a new product
    - 3. Update a product
    - 4. Delete a product
  - [Shopping List](#shopping-list)
    - 1. Get shopping list
    - 2. Add to shopping list
    - 3. Remove from shopping list
    - 4. Apply promo code
  - [Promo Codes](#promo-codes)
    - 1. Get a list of promo codes
    - 2. create promo code
- [Postman Collection](#postman-collection)

## Description

A simple API that allows users to:

- view a list of product

- create - update - delete products

- Add products to shopping list

- remove products from shopping list

- view their shopping list and the total price

build under the assumption that only one user will be using the whole application

## Stack Used

- **Node.js**
- **Express**
- **TypeScript**
- **MySql**
- **Sequelize**
- **Docker**
- **Jest**

## Getting Started

#### To start the project in a Docker environment (development mode), run:

```bash
npm i
npm run start:docker
```

This command will build and run the application in a Docker container, setting up all necessary dependencies and configurations.

make sure to set environment variables in the `.env` as mentioned in `.env.example`

#### to run without docker

```
npm run build
npm run start
```

or in watch mode

```
npm run start:dev
```

setting the environment variales according to your local connection

## Tests

to run the unit tests included in the docker container

```
npm run test:docker
```

or outside docker

```
npm run test
```

## API Endpoints

### Products

**_1- get a list of products._**

#### Endpoint

```
GET /products/
```

#### Query Parameters:

- page (default 1)
- limit (default 10)

#### Success Response

##### status code: 200

##### Response body

```json
{
  "totalCount": 1,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": 2161,
      "name": "Computer",
      "quantity": 4,
      "price": 10,
      "createdAt": "2025-06-20T20:27:53.000Z",
      "updatedAt": "2025-06-20T20:27:53.000Z"
    }
  ]
}
```

---

---

**_2- Create a new product._**

#### Endpoint

```
POST /products/
```

#### Request Body

```json
{
  "name": "Computer",
  "quantity": 4,
  "price": 10
}
```

#### Success Response

##### status code: 201

##### Response body

```json
{
  "data": {
    "id": 2161,
    "name": "Computer",
    "quantity": 4,
    "price": 10,
    "updatedAt": "2025-06-20T20:27:53.596Z",
    "createdAt": "2025-06-20T20:27:53.596Z"
  }
}
```

---

---

**_3- Update a product._**

#### Endpoint

```
PATCH /products/:productId
```

#### URL Parameter

productId – ID of the product to update

#### Request Body

```json
{
  "name": "Computer",
  "price": 5,
  "quantity": 6
}
```

#### Success Response

##### status code: 200

##### Response body

```json
{
  "id": 1,
  "name": "Computer",
  "price": 5,
  "quantity": 6
}
```

---

---

**_4- Delete a product._**

#### Endpoint

```
DELETE /products/:productId
```

#### URL Parameter

productId – ID of the product to update

#### Success Response

##### status code: 204

### Shopping List

**_1- get shopping list._**

#### Endpoint

```
GET /shopping-lists/
```

#### Query Parameters:

- page (default 1)
- limit (default 10)

#### Success Response

##### status code: 200

##### Response body

```json
{
  "metaData": {
    "finalPrice": 10,
    "promoCodeApplied": null // could be string "50OFF"
  },
  "totalCount": 1,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "quantity": 1,
      "product": {
        "id": 2162,
        "name": "Computer",
        "price": 10
      }
    }
  ]
}
```

---

---

**_2- Add to shopping List_**

#### Endpoint

```
POST /shopping-lists/
```

#### Request Body

```json
{
  "productId": 5,
  "quantity": 6
}
```

#### Success Response

##### status code: 201

##### Response body

```json
{
  "data": true
}
```

---

---

**_3- remove from shopping list._**

#### Endpoint

```
DELETE /shopping-lists/:productId
```

#### URL Parameter

productId – ID of the product to remove from shopping list

#### Success Response

##### status code: 204

----
----

**_4- apply promo code to shopping list._**

#### Endpoint

```
POST /shopping-lists/promo-code/apply
```

#### Request Body

```json
{
  "code": "50%OFF"
}
```

#### Success Response

##### status code: 201

##### Response body

```json
{
  "data": true
}
```

---

### Promo Codes

**_1- get a list of promo codes._**

#### Endpoint

```
GET /promo-codes/
```

#### Query Parameters:

- page (default 1)
- limit (default 10)

#### Success Response

##### status code: 200

##### Response body

```json
{
  "totalCount": 1,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": 6,
      "code": "50%OFF",
      "discountPercentage": 50,
      "createdAt": "2025-06-20T21:21:40.000Z",
      "updatedAt": "2025-06-20T21:21:40.000Z"
    }
  ]
}
```

---

---

**_2- Create a new promo code._**

#### Endpoint

```
POST /promo-codes/
```

#### Request Body

```json
{
  "code": "Code",
  "discountPercentage": 70
}
```

#### Success Response

##### status code: 201

##### Response body

```json
{
  "data": {
    "id": 9,
    "code": "Code",
    "discountPercentage": 70,
    "updatedAt": "2025-06-20T22:23:20.034Z",
    "createdAt": "2025-06-20T22:23:20.034Z"
  }
}
```

---

---

## Postman Collection

here's the link to [postman collection for the available endpoints](https://drive.google.com/file/d/1cSt46YMRq0jRVfAqvYExmL_JqatGpOM9/view?usp=sharing)
