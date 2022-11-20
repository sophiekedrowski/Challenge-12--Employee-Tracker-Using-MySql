INSERT INTO department (id, department_name)
VALUES (01, "Observation"), 
(02, "Med-Surg");

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (02, "Nurse", 55000, 4900);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(9, "Sophie", "Kedrowski", 99, 02),
(10, "Noah", "Ridge", 100, NULL);