INSERT INTO department (id, department_name)
VALUES (01, "Observation"), 
(02, "Med-Surg");

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (01, "Nurse", 55000, 01);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(9, "Sophie", "Kedrowski", 01, 02);

UPDATE employee
SET role_id = 1
WHERE id = 1;