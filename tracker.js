//Dependancies
var mysql = require("mysql");
var inquirer = require("inquirer");

// My SQL Connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "u23gDX9s",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

//Prints out ASCII Welcome Page
console.log(
  " _____                 _                         __  __ \n" +
    "| ____|_ __ ___  _ __ | | ___  _   _  ___  ___  |  \\/  | __ _ _ __   __ _  __ _  ___ _ __ \n" +
    "|  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__| \n" +
    "| |___| | | | | | |_) | | (_) | |_| |  __/  __/ | |  | | (_| | | | | (_| | (_| |  __/ | \n" +
    "|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_| \n" +
    "                |_|            |___/                                      |___/  \n"
);
function main() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["View", "Add", "Update", "Exit"],
        name: "list",
      },
    ])
    .then(function (answers) {
      //could a switch statement be used here?
      if (answers.list === "Exit") {
        connection.end();
      } else if (answers.list === "View") {
        //ask what would like to be viewed, departments, roles emps
        inquirer
          .prompt([
            {
              type: "list",
              message: "What would you like to view?",
              choices: ["Departments", "Roles", "Employees"],
              name: "view",
            },
          ])
          .then(function (answers) {
            if (answers.view === "Departments") {
              printTable("departments");
            } else if (answers.view === "Roles") {
              printTable("role");
            } else if (answers.view === "Employees") {
              printTable("employee");
            }
          }); //end of VIEW
      } else if (answers.list === "Add") {
        //ask what would like to be added, departments, roles emps
        inquirer
          .prompt([
            {
              type: "list",
              message: "What would you like to add?",
              choices: ["Departments", "Roles", "Employee"],
              name: "add",
            },
          ])
          .then(function (answers) {
            if (answers.add === "Departments") {
              //sql to add into departments

              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Please enter in new Department",
                    name: "depart",
                  },
                ])
                .then(function (answers) {
                  connection.query(
                    "INSERT INTO departments SET ?",
                    {
                      name: answers.depart,
                    },
                    function (err) {
                      if (err) throw err;
                      console.log(
                        `${answers.depart} was successfully entered into department table`
                      );
                      main();
                    }
                  );
                });
            } else if (answers.add === "Roles") {
              //sql to add into roles

              connection.query("SELECT * FROM departments", function (
                err,
                data
              ) {
                if (err) throw err;
                console.log(data);

                const departments = data.map((element) => ({
                  name: element.name,
                  value: element.id,
                }));

                console.log(departments);

                inquirer
                  .prompt([
                    {
                      type: "input",
                      message: "Please enter in new role title.",
                      name: "title",
                    },
                    {
                      type: "input",
                      message: "Please input new role salary.",
                      name: "salary",
                    },
                    {
                      type: "list",
                      message: "Select the new role's department",
                      name: "department_id",
                      choices: departments,
                    },
                  ])
                  .then(function (answers) {
                    console.log(answers);
                    connection.query(
                      "INSERT INTO role SET ?",

                      {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.department_id,
                      },

                      function (err) {
                        if (err) throw err;
                        console.log(
                          `${answers.title} was successfully entered into the role table`
                        );
                        main();
                      }
                    );
                  });
              });
            } else if (answers.add === "Employee") {
              connection.query("SELECT * FROM employee", function (err, data) {
                if (err) throw err;

                const managers = data.map((element) => ({
                  name: element.first_name + " " + element.last_name,
                  value: element.id,
                }));

                connection.query("SELECT * FROM role", function (err, res) {
                  if (err) throw err;

                  const roles = res.map((element) => ({
                    name: element.title,
                    value: element.id,
                  }));

                  inquirer
                    .prompt([
                      {
                        type: "input",
                        message: "What is the new employee's first name?",
                        name: "first_name",
                      },
                      {
                        type: "input",
                        message: "What is the new employee's last name?",
                        name: "last_name",
                      },
                      {
                        type: "list",
                        message: "What is the new employee's role?",
                        choices: roles,
                        name: "role_id",
                      },
                      {
                        type: "list",
                        message: "Who is the new employee's manager?",
                        choices: managers,
                        name: "manager_id",
                      },
                    ])
                    .then(function (answers) {
                      console.log(answers);

                      connection.query(
                        "INSERT INTO employee SET ?",
                        answers,
                        function (err) {
                          if (err) throw err;
                          console.log("Succesfully entered in new employee");
                          main();
                        }
                      );
                    });
                });
              });
            }
          });
      } else if (answers.list === "Update") {
        connection.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;

          const employee = res.map((element) => ({
            name: element.first_name + " " + element.last_name,
            id: element.id,
          }));

          connection.query("SELECT * FROM role", function (err, res2) {
            const role = res2.map((element) => ({
              name: element.title,
              id: element.id,
            }));

            console.log(employee);
            console.log(role);
            inquirer
              .prompt([
                {
                  type: "list",
                  message:
                    "Please select the employee you would like to update",
                  name: "employeeName",
                  choices: employee,
                },
                {
                  type: "list",
                  message: "What new role would you like to assign to him/her",
                  name: "newRole",
                  choices: role,
                },
              ])
              .then(function (answers) {
                console.log(answers.employeeName);
                console.log(answers.newRole);

                connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      role_id: answers.newRole,
                    },
                    {
                      id: answers.employeeName,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(`${answers.employeeName} was updated!`)
                  }
                );
              });
          });
        });
      }
      //end of else if statement
    }); // end of main .then statement
} //end of main function

function printTable(data) {
  const query = "SELECT * FROM " + data;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    main();
  });
}

main();
