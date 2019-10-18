# Point Of Sales RESTful API

 RESTful API for Point Of Sales App built with Expess.js, Node.js and MySql.

# Introduction
Point of Sales RESTful API is an API that allow the users to read products and categories information data from database. Point of Sales RESTful API also allow users to create, update and delete a product and its category information into/from database.

There're some features which allow users to sort the products (based on name, category or date_updated), add or reduce quantity of the product, search a product by name and accessing products with amount of limit for each page.

This documentation outlines the Point of Sales RESTful API functionality.

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16.3-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v.2.17.1-blue)](https://www.npmjs.com/search?q=mysql) 

## Requirements

1. [Node Js](https://nodejs.org/en/download/)
2. [Express JS]("https://expressjs.com/en/starter/installing.html")
3. [Postman]("https://www.getpostman.com/")
4.  Web Server (ex. localhost)
5.  Code Editor (VS Code, Sublime, Atom, etc)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js

Node.js is a software that designed to develop web-based applications and is written in the syntax of the JavaScript programming language. JavaScript as a programming language that runs on the client / browser side only can be completed by Node.js. With Node.js, JavaScript can also act as a programming language that runs on the server side, such as PHP, Ruby, Perl, and so on. 

Node.js can run on Windows, Mac OS X and Linux operating systems without the need for program code changes. Node.js has its own HTTP server library that make it possible to run a web server without using a web server program such as Apache or Nginx.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js is one of the most popular web frameworks for Node.js. The complete documentation and its use which is quite easy, can make us develop various products such as web applications or RESTful API.

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/books)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'pointofsales'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **pointofsales** :

```
CREATE DATABASE pointofsales;
```

Create Table named **product** :

```
CREATE TABLE product (
    id_product INT AUTO INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price BIGINT(20),
    quantity INT(10),
    description VARCHAR(255),
    image VARCHAR(255),
    date_added timestamp CURRENT_TIMESTAMP,
    date_updated timestamp CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_category) REFERENCE categories(id_category)
);
```

Create Table named **categories** :

```
CREATE TABLE categories(
    id_category INT AUTO INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
```

## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

  ```
    {
    "message": "Welcome to Rent Book Api",
  }
  ```

#### **CRUD Product Endpoint**
* **Show All Products**
  - **Request** : **`GET /product`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Tuna Wet Food",
            "price": 10000,
            "quantity": 117,
            "description": "For Cat Snacks",
            "image": "snacks.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-18T17:05:12.000Z"
        },
        {
            "name": "Whiskas Tuna",
            "price": 50000,
            "quantity": 16,
            "description": "For Kitten",
            "image": "whiskas.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-17T06:48:13.000Z"
        },
        {
            "name": "Whiskas Salmon",
            "price": 16000,
            "quantity": 100,
            "description": "For Adult Cat",
            "image": "whiskas_salmon.jpg",
            "date_added": "2019-10-15T08:36:00.000Z",
            "date_updated": "2019-10-15T15:11:38.000Z"
        },
        {
            "name": "Pedigree Snack",
            "price": 150000,
            "quantity": 150,
            "description": "For Above 6 Month - 100kg",
            "image": "snacks2.jpg",
            "date_added": "2019-10-16T09:07:30.000Z",
            "date_updated": "2019-10-16T09:07:30.000Z"
        },
        {
            "name": "Lovely Cat Shampoo ",
            "price": 15000,
            "quantity": 124,
            "description": "Shampoo for lovely hair cat",
            "image": "lovely_shampoo.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z"
        },
        {
            "name": "Medium Cage",
            "price": 500000,
            "quantity": 10,
            "description": "1 x 1 m",
            "image": "medium_cage.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:36:13.000Z"
        },
        {
            "name": "Small Clothes for Dog",
            "price": 10000,
            "quantity": 12,
            "description": "100% cotton",
            "image": "dog_clothes.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z"
        },
        {
            "name": "Apple Scent Litter Sand",
            "price": 25000,
            "quantity": 101,
            "description": "New Formula - 5kg",
            "image": "litter_sand.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-18T01:11:47.000Z"
        },
        {
            "name": "Bye Flies - Cat Medicine",
            "price": 10000,
            "quantity": 100,
            "description": "for kill cat flies",
            "image": "bye_flies.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z"
        },
        {
            "name": "Small Size Necklace ",
            "price": 15000,
            "quantity": 25,
            "description": "small size with a bell necklace",
            "image": "small_necklace.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:35:42.000Z"
        }
    ]
}
```
* **Show a Product**
  - **Request** : **`GET /product/show/:id`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "name": "Bye Flies - Cat Medicine",
            "price": 10000,
            "quantity": 100,
            "description": "for kill cat flies",
            "image": "bye_flies.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z"
        }
    ]
}
```
* **Create a product** 
  - **Request** : **`POST /product`**
  - **Response** :
```
{
    "message": "Succesfully added product!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 12,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Update a product** 
  - **Request** : **`PATCH /product/:id`**
  - **Response** :
```
{
    "message": "Succesfully updated product!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Delete a product** 
  - **Request** : **`DELETE /product/:id`**
  - **Response** : 
```
{
    "message": "Succesfully delete product!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### CRUD Categories Endpoint
* **Read All Genres**
  - **Request** : **`GET /categories`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id_category": 1,
            "name": "Dog Food"
        },
        {
            "id_category": 2,
            "name": "Cat Food"
        },
        {
            "id_category": 3,
            "name": "Pet Toys"
        },
        {
            "id_category": 4,
            "name": "Pet Cage"
        },
        {
            "id_category": 5,
            "name": "Pet Clothes"
        },
        {
            "id_category": 6,
            "name": "Pet Accessories"
        },
        {
            "id_category": 7,
            "name": "Pet Equipments"
        },
        {
            "id_category": 8,
            "name": "Medicine"
        },
        {
            "id_category": 9,
            "name": "Rabbit Food"
        },
        {
            "id_category": 10,
            "name": "Bath Series"
        }
    ]
}
```
* **Create a category** 
  - **Request** : **`POST /category`**
  - **Response** :
```
{
    "message": "Succsessfully added category!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 17,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Update a Category** 
  - **Request** : **`PATCH /category/:id`**
  - **Response** :
```
{
    "message": "Succsessfully updated category!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Delete a category** (Need Verification)
  - **Request** : **`DELETE /category/:id`**
  - **Response** :
```
{
    "message": "Succsessfully delete category!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### Add and Reduce Product's Quantity Endpoint

**Add Quantity** 
  - **Request** : **`PATCH /product/add/:id`**
  - **Response** :
```
{
    "message": "Succesfully add quantity into product!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Reduce a quantity of product**
  - **Request** : **`PATCH /product/reduce/:id`**
  - **Response** :
```
{
    "message": "Succesfully reduce quantity from product!",
    "response": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```

**Sorting Products** (Based on name, category or date updated)
  - **Request** : **`GET product/sort?sortBy&order`**
  - **Response** : 
```
{
    "status": 200,
    "result": [
        {
            "name": "Whiskas Tuna",
            "price": 50000,
            "quantity": 16,
            "description": "For Kitten",
            "image": "whiskas.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-18T20:21:17.000Z",
            "category": "Cat Food"
        },
        {
            "name": "Whiskas Salmon",
            "price": 16000,
            "quantity": 100,
            "description": "For Adult Cat",
            "image": "whiskas_salmon.jpg",
            "date_added": "2019-10-15T08:36:00.000Z",
            "date_updated": "2019-10-15T15:11:38.000Z",
            "category": "Cat Food"
        },
        {
            "name": "Tuna Wet Food",
            "price": 10000,
            "quantity": 117,
            "description": "For Cat Snacks",
            "image": "snacks.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-18T17:05:12.000Z",
            "category": "Cat Food"
        },
        {
            "name": "Small Size Necklace ",
            "price": 15000,
            "quantity": 25,
            "description": "small size with a bell necklace",
            "image": "small_necklace.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:35:42.000Z",
            "category": "Pet Accessories"
        },
        {
            "name": "Small Clothes for Dog",
            "price": 10000,
            "quantity": 12,
            "description": "100% cotton",
            "image": "dog_clothes.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z",
            "category": "Pet Clothes"
        },
        {
            "name": "Pedigree Snack",
            "price": 150000,
            "quantity": 150,
            "description": "For Above 6 Month - 100kg",
            "image": "snacks2.jpg",
            "date_added": "2019-10-16T09:07:30.000Z",
            "date_updated": "2019-10-16T09:07:30.000Z",
            "category": "Dog Food"
        },
        {
            "name": "Pedigree Premium",
            "price": 100000,
            "quantity": 100,
            "description": "3kg",
            "image": "pedpremium.jpg",
            "date_added": "2019-10-18T19:36:14.000Z",
            "date_updated": "2019-10-18T19:36:14.000Z",
            "category": "Dog Food"
        },
        {
            "name": "Medium Cage",
            "price": 500000,
            "quantity": 10,
            "description": "1 x 1 m",
            "image": "medium_cage.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:36:13.000Z",
            "category": "Pet Cage"
        },
        {
            "name": "Lovely Cat Shampoo ",
            "price": 15000,
            "quantity": 124,
            "description": "Shampoo for lovely hair cat",
            "image": "lovely_shampoo.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z",
            "category": "Bath Series"
        },
        {
            "name": "Bye Flies - Cat Medicine",
            "price": 10000,
            "quantity": 100,
            "description": "for kill cat flies",
            "image": "bye_flies.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z",
            "category": "Medicine"
        },
        {
            "name": "Apple Scent Litter Sand",
            "price": 25000,
            "quantity": 101,
            "description": "New Formula - 5kg",
            "image": "litter_sand.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-18T01:11:47.000Z",
            "category": "Pet Equipments"
        }
    ]
}
```
* **Search product by name**
  - **Request** : **`GET /product/search?name`**
  - **Response** : 
```
{
    "status": 200,
    "result": [
        {
            "name": "Pedigree Snack",
            "price": 150000,
            "quantity": 150,
            "description": "For Above 6 Month - 100kg",
            "image": "snacks2.jpg",
            "date_added": "2019-10-16T09:07:30.000Z",
            "date_updated": "2019-10-16T09:07:30.000Z"
        },
        {
            "name": "Pedigree Premium",
            "price": 100000,
            "quantity": 100,
            "description": "3kg",
            "image": "pedpremium.jpg",
            "date_added": "2019-10-18T19:36:14.000Z",
            "date_updated": "2019-10-18T19:36:14.000Z"
        }
    ]
}
```
* **Show products using pagination**
  - **Request** : **`GET /product/page/:pagenumber`**
  - **Response** : 
```
{
    "status": 200,
    "result": [
        {
            "name": "Tuna Wet Food",
            "price": 10000,
            "quantity": 117,
            "description": "For Cat Snacks",
            "image": "snacks.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-18T17:05:12.000Z"
        },
        {
            "name": "Whiskas Tuna",
            "price": 50000,
            "quantity": 16,
            "description": "For Kitten",
            "image": "whiskas.jpg",
            "date_added": "2019-10-15T04:29:42.000Z",
            "date_updated": "2019-10-18T20:21:17.000Z"
        },
        {
            "name": "Whiskas Salmon",
            "price": 16000,
            "quantity": 100,
            "description": "For Adult Cat",
            "image": "whiskas_salmon.jpg",
            "date_added": "2019-10-15T08:36:00.000Z",
            "date_updated": "2019-10-15T15:11:38.000Z"
        },
        {
            "name": "Pedigree Snack",
            "price": 150000,
            "quantity": 150,
            "description": "For Above 6 Month - 100kg",
            "image": "snacks2.jpg",
            "date_added": "2019-10-16T09:07:30.000Z",
            "date_updated": "2019-10-16T09:07:30.000Z"
        },
        {
            "name": "Lovely Cat Shampoo ",
            "price": 15000,
            "quantity": 124,
            "description": "Shampoo for lovely hair cat",
            "image": "lovely_shampoo.jpg",
            "date_added": "2019-10-17T05:33:36.000Z",
            "date_updated": "2019-10-17T05:33:36.000Z"
        }
    ]
}
```

