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

function main() {
    console.log(
        

  " _____                 _                         __  __ \n" +                                  
  "| ____|_ __ ___  _ __ | | ___  _   _  ___  ___  |  \\/  | __ _ _ __   __ _  __ _  ___ _ __ \n" +
  "|  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \  | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__| \n" +
  "| |___| | | | | | |_) | | (_) | |_| |  __/  __/ | |  | | (_| | | | | (_| | (_| |  __/ | \n" +
  "|_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_| \n" + 
  "                |_|            |___/                                      |___/  \n"        
 




    )




//   inquirer.prompt([

//   ]).then(function(answers){

//   })

} //end of main function

main();