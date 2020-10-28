DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db; 

CREATE TABLE departments (
	id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    primary key (id)

);

create table role (
	id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) unsigned NOT NULL,
    department_id INT NOT NULL,
    primary key (id)
);

CREATE TABLE employee (
	id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT Null,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    primary key	(id)

);