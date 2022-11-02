INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Legal"),
       (4, "Sanitation"),
       (5, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Software Engineer", 115000, 2),
       (3, "Lawyer", 120000, 3),
       (4, "Janitor", 30000, 4),
       (5, "Paralegal", 110000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Trey", "Lance", 1, NULL),
       (2, "Nick", "Bosa", 2, NULL),
       (3, "Geroge", "Kittle", 3, NULL),
       (4, "Danial", "Mirza", 4, 005),
       (5, "Kyle", "Shanahan", 5, 085);

USE employee_db;

SHOW tables;

-- SELECT department.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
-- FROM employee
-- JOIN role
-- ON role.id = employee.role_id
-- JOIN department
-- On department.id = role.department_id;