//Dependancies 
var mysql = require("mysql");
var inquirer = require("inquirer");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

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
    "|  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \  | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__| \n" +
    "| |___| | | | | | |_) | | (_) | |_| |  __/  __/ | |  | | (_| | | | | (_| | (_| |  __/ | \n" +
    "|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_| \n" + 
    "                |_|            |___/                                      |___/  \n"        
  
      );
function main() {
    



  inquirer.prompt([
      {
          type: "list",
          message: "What would you like to do?",
          choices: ["View","Add","Update","Exit"],
          name: "list"
      }

  ]).then(function(answers){
      //could a switch statement be used here?
    if (answers.list === "Exit") {
        connection.end();
    } else if (answers.list === "View") {
        //ask what would like to be viewed, departments, roles emps
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to view?",
                choices: ["Departments", "Roles", "Employees"],
                name: "view"
            }
        ]).then(function(answers){
            if (answers.view === "Departments") {
                printTable("departments");
            } else if (answers.view === "Roles") {
                printTable("role");
            } else if (answers.view === "Employees") {
                printTable("employee");
               
            }
        }) //end of VIEW 
    } else if (answers.list === "Add") {
        //ask what would like to be added, departments, roles emps
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to add?",
                choices: ["Departments", "Roles", "Employee"],
                name: "add"

            }
        ]).then(function(answers){
            if (answers.add === "Departments") {
                //sql to add into departments 

                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter in new Department",
                        name : "depart"
                    }
                ]).then(function(answers){
                    connection.query("INSERT INTO departments SET ?",
                    {
                        name: answers.depart
                    }, function(err) {
                        if (err) throw err;
                        console.log(`${answers.depart} was successfully entered into department table`);
                        main();
                    }
                    )
                })
            } else if (answers.add === "Roles") {
                //sql to add into roles 
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter in new roles title.",
                        name : "title"
                    }, 
                    {
                        type: "input",
                        message: "Please input new role's salary.",
                        name: "salary"
                    }, 
                    {
                        type: "list",
                        message: "Select the new role's department",
                        name : "department_id",
                        //do i do a join here? or list numbers?      
                        choices : []
                    }
                ]).then(function(answers){
                    connection.query("INSERT INTO role SET ?",

                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.department_id
                    }, 

                    function(err) {
                        if (err) throw err;
                        console.log(`${answers.title} was successfully entered into the role table`);
                        main();
                    }
                    )
                })
            } else if (answers.add === "Employee") {
                //sql to add employee here 

            }
        })
    } else if (answers.list === "Update") {
        //ask what would like to be updated, departments, roles emps
    }

  }) 

} //end of main function


//ask hannah about making this funciton work 
function printTable(data){
    const query = "SELECT * FROM " + data;
    connection.query(query, function(err, res){
        if (err) throw err; 
        console.table(res);
        main()
    });
}


main();