var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");

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

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

async function addEmployee() {
  const data = await connection.query("SELECT * FROM employee");
  const managers = data.map((element) => ({
    name: element.first_name + " " + element.last_name,
    value: element.id,
  }));

  const res = await connection.query("SELECT * FROM role");
  const roles = res.map((element) => ({
    name: element.title,
    value: element.id,
  }));

  const answers = await inquirer.prompt([
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
  ]);

  console.log(answers);
  connection.query("INSERT INTO employee SET ?", answers);
  console.log("Success!");
  connection.end();
}

addEmployee();