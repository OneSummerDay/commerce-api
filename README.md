# Commerce API

A simple backend API for a small e-commerce system built with Node.js, Express, TypeScript, Prisma, PostgreSQL and Docker.

The project demonstrates authentication, product management, comments, filtering, purchases and pagination.  
It was created as a learning project to practice building a REST API with a modern backend stack.

# Tech Stack

Node.js  
Express  
TypeScript  
Prisma ORM  
PostgreSQL  
Docker  
JWT Authentication

# Features

## Authentication

User registration and login with JWT authentication.

Endpoints:

POST /auth/register  
POST /auth/login

## Products

CRUD operations for products.

Endpoints:

GET /products  
POST /products  
PUT /products/:id  
DELETE /products/:id  

Product fields include:

- title
- description
- price
- categoryId
- createdAt

## Product Filtering

Products can be filtered using query parameters.

Examples:

GET /products?categoryId=1  
GET /products?minPrice=10  
GET /products?maxPrice=100  
GET /products?categoryId=1&minPrice=10&maxPrice=100  

## Sorting by Popularity

Products can be sorted by popularity based on the number of comments.

Example:

GET /products?sort=popular

## Pagination

Pagination is supported for product listing.

Example:

GET /products?page=1&limit=10

Example response:

{
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  },
  "products": []
}

## Comments

Users can leave comments on products.

Endpoints:

GET /products/:id/comments  
POST /products/:id/comments  
DELETE /comments/:id  

Rules:

- only authenticated users can create comments
- users can delete only their own comments

## Purchases

Users can purchase multiple products in a single order.

Endpoints:

POST /purchases  
GET /purchases/my  

Example request:

{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}

Each purchase stores:

- products
- quantities
- price at the moment of purchase
- total amount

# Running the Project

## 1. Clone the repository

git clone https://github.com/OneSummerDay/commerce-api.git  
cd commerce-api

## 2. Start Docker containers

docker compose up -d --build

This will start:

- Node.js application
- PostgreSQL database

## 3. Run database migrations

docker compose exec app npx prisma migrate dev

## 4. Generate Prisma client

docker compose exec app npx prisma generate

## 5. API will be available at

http://localhost:3000

# Example Workflow

1. Register user

POST /auth/register

2. Login

POST /auth/login

3. Create product

POST /products

4. Comment on product

POST /products/:id/comments

5. Purchase products

POST /purchases

6. View purchase history

GET /purchases/my

# Database

The project uses PostgreSQL with Prisma ORM.

Main tables:

- users
- products
- categories
- comments
- purchases
- purchase_items

# Author

Created as a backend practice project for learning:

- REST API design
- authentication
- ORM usage
- Docker-based development
- relational data modeling