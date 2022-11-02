const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const inquirer = require('inquirer');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password123',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const department = []
  const roles = []
  const employees = []

  db.query("SELECT department.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee JOIN role ON role.id = employee.role_id JOIN department On department.id = role.department_id;", function (err, results) {
    console.log("---------------------------------------------------------------------------")
    console.log("ID | First Name | Last Name | Title | Salary | Manager ID |");
    for (let i = 0; i < results.length; i++){
        console.log(results[i].id + " | " + results[i].first_name + "       | " + results[i].last_name + "       | " + results[i].title + "       | " + results[i].salary + "       | " + results[i].manager_id) + "       |";
    }
    console.log("--------------------------------------------------------------------------")

    inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: "Select an option",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ])
    .then((response) => {
        for(let dept = 0; dept < results.length; dept++){
            department.push(results[dept].name);
        }
        for(let role = 0; role < results.length; role++){
            roles.push(results[role].title);
        }
        for(let j = 0; j < results.length; j++){
            employees.push(results[j].first_name + " " + results[j].last_name);
        }

        if(response.options === "View All Departments"){
            for(let dept = 0; dept < results.length; dept++){
                console.log(results[dept].name);
            }
        }
        if(response.options === "View All Roles"){
            for(let role = 0; role < results.length; role++){
                console.log(results[role].title);
            }
        }
        if(response.options === "View All Employees"){
            for(let j = 0; j < results.length; j++){
                console.log(results[j].first_name + " " + results[j].last_name);
            }
        }
        if(response.options === "Add a Department"){
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'addDept',
                    message: "Type the Department Name"
                }
            ])
            .then((answer) => {
                department.push(answer.addDept);
                for(let i = 0; i < department.length; i++){
                    console.log(department[i]);
                }
            });
        }
        if(response.options === "Add a Role"){
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'addRole',
                    message: "Type the Role Name"
                }
            ])
            .then((answer) => {
                roles.push(answer.addRole);
                for(let role = 0; role < roles.length; role++){
                    console.log(roles[role]);
                }
            });
        }
        if(response.options === "Add an Employee"){
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'addEmp',
                    message: "Type the Employee's Full Name"
                }
            ])
            .then((answer) => {
                employees.push(answer.addEmp);
                for(let k = 0; k < employees.length; k++){
                    console.log(employees[k]);
                }
            });
        }
        if(response.options === "Update an Employee Role"){
            console.log("Couldn't Finish This Part and Couldn't Continue To Ask User to Input More Than Once.")
        }
    });
    
  });

  app.use((req, res) => {
    res.status(404).end();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
