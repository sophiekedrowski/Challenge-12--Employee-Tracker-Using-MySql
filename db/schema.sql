DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Use inventory_db --
USE employees_db;

-- See database in use --
SELECT DATABASE();

-- Creates the table "biographies" within books_db --
CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT 
);



-- Insert multiple produce items --
-- INSERT INTO produce (id, name)
-- VALUES
--     ( 1, "apple"),
--     ( 2, "orange"),
--     ( 3, "banana");

-- Insert row into produce table --
-- INSERT INTO produce (id, name)
--   VALUES (1, "apple");



