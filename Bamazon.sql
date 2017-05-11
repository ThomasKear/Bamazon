CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE products (
		id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(45) NULL,
		department_name VARCHAR(45) NULL,
		price DECIMAL(10,2) NULL,
		stock_quanity INT NULL,	
		product_sales DECIMAL(10,2) NULL,
		PRIMARY KEY (id)
	);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(45) NULL, 
	over_head_costs DECIMAL (10.2) NULL,
	total_sales DECIMAL (10.2) NULL,
	PRIMARY KEY (department_id)
	);