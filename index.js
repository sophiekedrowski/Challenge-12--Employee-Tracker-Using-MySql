const inquirer = require('inquirer');
const fs = require('fs');
const connection = require("./server");


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
                    db.end();
                    break;
            }

        })
}

function addDepartment() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'id',
                message: 'What is your department id?'
            },
            {
                type: 'input',
                name: 'department_name',
                message: 'What is your department name?'
            }
        ]).then(function ({ id, department_name }) {
            connection.query(`INSERT INTO department (id, department_name) VALUES (?,?)`, [099798676, 'eddsfadsfsdff'], function (err, result) {
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
            name: 'id',
            message: 'What is your employee id?'
        },
        {
            type: 'input',
            name: 'first name',
            message: 'What is your first name'
        },
        {
            type: 'input',
            name: 'last name',
            message: 'What is your last name?'
        },
        {
            type: 'input',
            name: 'role id',
            message: 'What is your role id?'
        },
        {
            type: 'input',
            name: 'manager id',
            message: 'What is your manager id, type null if not applicable?'
        },
    ]).then(function ({ id, first_name, last_name, role_id, manager_id }) {
        connection.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)`, [099798676, 'Abby', 'Nelsom', 890, 989], function (err, result) {
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
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'id',
                message: 'What is your id?'
            },
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
                type: 'input',
                name: 'department_id',
                message: 'What is your department id?'
            }
        ]).then(function ({ id, title, salary, department_id }) {
            connection.query(`INSERT INTO employee_role ( id, title, salary, department_id) VALUES (?,?, ?, ?)`, [099798676, 'eddsfadsfsdff', 8345895, 90], function (err, result) {
                if (err) throw err;
                else {
                    console.log(`Added ${title} to database`)
                    // connection.close()
                }
                displayTeam()
            })
        });
}


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