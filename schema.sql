-- creates the database
CREATE database BamazonDB;
	
-- directs the following data to affect the correct database 
USE BamazonDB;

-- creates the table products
CREATE TABLE products (

		id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(45) NULL,
		department_name VARCHAR(45) NULL,
		price DECIMAL(10,2) NULL,
		stock_quantity INT NULL,	
		PRIMARY KEY (id)
);

-- creates new rows containing data in all named columns

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum No Rinse Wash & Shine", "Exterior", 15.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Car Wax", "Exterior", 17.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Hyper Polish Spray", "Exterior", 24.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Hyper Compound Spray", "Exterior", 29.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum FerreX Iron Remover", "Exterior", 14.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Gloss-Coat Paint Coating", "Exterior", 59.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Opti-Clay Towel", "Exterior", 24.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Paint Prep", "Exterior", 12.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Carpet & Fabric Cleaner & Protectant", "Interior", 24.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chemical Guys Sprayable Leather Cleaner & Conditioner", "Interior", 17.99, 9);