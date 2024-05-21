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
    description TEXT NOT NULL,
    name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `submissions`;
CREATE TABLE submissions (
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    challenge_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    code_repository VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `votes`;
CREATE TABLE votes (
    vote_id INT PRIMARY KEY AUTO_INCREMENT,
    submission_id INT NOT NULL,
    voter_username VARCHAR(255) NOT NULL,
    weight INT DEFAULT 1
);

DROP TABLE IF EXISTS `news`;
CREATE TABLE news (
    news_id INT PRIMARY KEY AUTO_INCREMENT,
    submission_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
