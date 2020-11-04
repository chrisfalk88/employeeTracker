INSERT INTO departments (name)
VALUES("R&D"),("Finance"),("Legal"),("HR"),("Sales"),("IT"),("Executive");


Insert INTO role (title, salary, department_id)
VALUES ("Accountant", 67000, 2),("Lawyer", 110000, 3),("Sales Representative", 80000, 1), ("People Manager", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
vALUES ("Lewis", "Falk", 2, 2), ("Heather","Falk", 4, null), ("Elliot", "Falk", 2);