CREATE DATABASE IF NOT EXISTS companydb;

use companydb;

CREATE TABLE IF NOT EXISTS employees (
    id INT(11) NOT NUll AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) DEFAULT NULL,
    salary DOUBLE(8,2) NOT NULL
);

describe employees;

INSERT INTO employees VALUES (1, 'John', 5000), (2, 'Jane', 6000), (3, 'Mark', 7000), (4, 'Mary', 8000), (5, 'Tom', 9000);