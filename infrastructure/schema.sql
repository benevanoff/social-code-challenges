DROP DATABASE IF EXISTS `sql_db`;
CREATE DATABASE sql_db;
USE sql_db;

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin INT DEFAULT 0
);

DROP TABLE IF EXISTS `challenges`;
CREATE TABLE challenges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    start_date VARCHAR(255) NOT NULL,
    end_date VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);