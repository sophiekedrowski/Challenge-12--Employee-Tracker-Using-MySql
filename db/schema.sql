DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Use inventory_db --
USE employees_db;

-- See database in use --
SELECT DATABASE();

-- Creates the table "biographies" within books_db --
CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
   REFERENCES  department(id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) 
  REFERENCES employee_role(id),
  manager_id INT NOT NULL REFERENCES employee
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



