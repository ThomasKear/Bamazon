CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE products (
		id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(45) NULL,
		department_name VARCHAR(45) NULL,
		price DECIMAL(10,2) NULL,
		stock_quanity INT NULL,	
		PRIMARY KEY (id)
);

