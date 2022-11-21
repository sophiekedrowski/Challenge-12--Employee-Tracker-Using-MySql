const inquirer = require('inquirer');
const fs = require('fs');
const connection = require("./server");
const { getRandomValues } = require('crypto');


function displayTeam() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'type',
                choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'All done'],
            }
        ]).then((data) => {
            // console.log(data)
            switch (data.type) {
                case 'View all employees':
                    displayEmployee()
                    console.log("\n")
                    // console.log("kjhdfkjshdfkj")
                    break;

                case 'Add employee':
                    addEmployee()
                    break;

                case 'Update employee role':
                    //Figure this one out
                    break;

                case 'View all roles':
                    displayEmployeeRole()
                    console.log("\n")
                    break;

                case 'Add role':
                    addRole()
                    break;

                case 'View all departments':
                    displayDepartment()
                    console.log("\n")
                    break;

                case 'Add department':
                    addDepartment()
                    break;
                case 'All done':
                    connection.end();
                    break;
            }

        })
}

function addDepartment() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'department_name',
                message: 'What is your department name?'
            }
        ]).then(function ({ department_name }) {
            connection.query(`INSERT INTO department (department_name) VALUES (?)`, [department_name], function (err, result) {
                if (err) throw err;
                else {
                    console.log(`Added ${department_name} to database`)
                    // connection.close()
                }
                displayTeam()
            })
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is your first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is your last name?'
        }
    ]).then(function ({ first_name, last_name}) {
        console.log(first_name, last_name)
        connection.query(`INSERT INTO employee (first_name, last_name) VALUES (?,?)`, [first_name, last_name], function (err, result) {
            if (err) throw err;
            else {
                console.log(`Added  employee ${first_name} to database`)
                // connection.close()
            }
            displayTeam()
        })
    })
}


function addRole() {

    getRoles().then((err,roles)=>{
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'title',
                message: 'What is your title?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is your salary?'
            },
            {
                type: 'list',
                message: 'What role is this department part of?',
                name: 'type',
                choices: roles.map() // ["Serivce", "Enginerr"]
            }
        ]).then(function ({ title, salary, role_type}) {
            connection.query(`INSERT INTO employee_role ( title, salary) VALUES (?,?)`, [title, salary], function (err, result) {
                if (err) throw err;
                else {
                    console.log(`Added ${title} to database`)
                    console.log(id, title, salary, department_id)
                    // connection.close()
                }
                displayTeam()
            })
        });
    })
}


// function updateRole(){

// }

function displayEmployee() {
    connection.query(`SELECT * FROM employees_db.employee`, function (err, employee) {
        if (err) throw err;
        else {
            console.table(employee)
        }
        displayTeam()
    })
}

function displayEmployeeRole() {
    connection.query(`SELECT * FROM employees_db.employee_role`, function (err, employeeRole) {
        if (err) throw err;
        else {
            console.table(employeeRole)
        }
        displayTeam()
    })
}

function getRoles() {
    return connection.promise().query(`SELECT * FROM employees_db.employee_role`)
}

function displayDepartment() {
    connection.query(`SELECT * FROM employees_db.department`, function (err, department) {
        if (err) throw err;
        else {
            console.table(department)
        }
        displayTeam()
    })
}


displayTeam();
// getRoles();