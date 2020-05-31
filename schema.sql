DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;


-- ### Alternative way to insert more than one row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee", "groceries", 35.00, 100),
("spark plugs", "automotive", 10.98, 100),
("USB converter", "electronics", 39.99, 50),
("zip-lock bags", "groceries", 8.69, 100),
("face serum", "beauty", 35.00, 50),
("simple green", "household", 10.97, 100),
("water", "groceries", 18.99, 100),
("toilet paper", "household", 17.99, 100);


-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);