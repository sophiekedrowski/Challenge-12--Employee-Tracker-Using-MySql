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
                    break;

                case 'Add employee':
                    updateEmployeeExtended()
                    break;

                case 'Update employee role':
                    updateRolesExtended()
                    break;

                case 'View all roles':
                    displayEmployeeRole()
                    console.log("\n")
                    break;

                case 'Add role':
                    retrieveDepartment()
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
                }
                displayTeam()
            })
        });
}

function addEmployee(roles, employeeManager) {
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
        },
        {
            type: 'list',
            name: 'employee_role',
            message: 'What is your employees role',
            choices: roles
        },
        {
            type: 'list',
            name: 'employee_manager',
            message: 'What is your employees manager',
            choices: employeeManager
        },


    ]).then(function ({ first_name, last_name, employee_role, employee_manager }) {
        console.log(first_name, last_name)
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?, ?, ?)`, [first_name, last_name, employee_role, employee_manager], function (err, result) {
            if (err) throw err;
            else {
                console.log(`Added  employee ${first_name} to database`)
            }
            displayTeam()
        })
    })
}


function addRole(departmentArray) {
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
                name: 'department',
                choices: departmentArray
            }
        ]).then(function ({ title, salary, department }) {
            console.log(department)

            connection.query(`INSERT INTO employee_role ( title, salary, department_id) VALUES (?,?, ?)`, [title, salary, department], function (err, result) {
                if (err) throw err;
                else {
                    console.log(`Added ${title} to database`)
                }
                displayTeam()
            })
        });

}


function updateRole(rolesArray, employeeArray) {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'employee',
                message: 'What employee would you like to update their role?',
                choices: employeeArray,
            },
            {
                type: 'list',
                name: 'employee_newRole',
                message: 'What is their new role?',
                choices: rolesArray,
            },
        ]).then(function ({ employee, employee_newRole }) {

            connection.query(`UPDATE employee SET role_id=? WHERE id=? `, [employee_newRole, employee], function (err, result) {
                if (err) throw err;
                else {
                    console.log("Added to database")
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

function getEmployee() {
    return connection.promise().query(`SELECT * FROM employees_db.employee`)
}

function getDepartments() {
    return connection.promise().query(`SELECT * FROM employees_db.department`)
}

function retrieveDepartment(){
getDepartments().then((data) => {
    let departmentArray = []

    for (let i = 0; i < data[0].length; i++) {

        const deptName = data[0][i].department_name
        const deptID = data[0][i].id

        departmentArray.push({name:deptName, value:deptID})
    }
    addRole(departmentArray)

}
)
}


function updateRolesExtended() {
    getRoles().then((data) => {
        let rolesArray = []
        for (let i = 0; i < data[0].length; i++) {

            const roleName = data[0][i].title
            const roleID = data[0][i].id

            rolesArray.push({ name: roleName, value: roleID })
        }
        getEmployee().then((dataTwo) => {

            let managersArray = []
            for (let i = 0; i < dataTwo[0].length; i++) {

                const managerFirst = dataTwo[0][i].first_name
                const managerLast = dataTwo[0][i].last_name

                const managerID = dataTwo[0][i].id

                managersArray.push({ name: managerFirst + " " + managerLast, value: managerID })
            }
            updateRole(rolesArray, managersArray)
        }
        )
    }
    )
}

function updateEmployeeExtended() {
    getRoles().then((data) => {
        let rolesArray = []
        for (let i = 0; i < data[0].length; i++) {

            const roleName = data[0][i].title
            const roleID = data[0][i].id

            rolesArray.push({ name: roleName, value: roleID })
        }
        getEmployee().then((dataTwo) => {

            let managersArray = [{name:"None", value:null}]
            for (let i = 0; i < dataTwo[0].length; i++) {

                const managerFirst = dataTwo[0][i].first_name
                const managerLast = dataTwo[0][i].last_name

                const managerID = dataTwo[0][i].id

                managersArray.push({ name: managerFirst + " " + managerLast, value: managerID })
            }
            addEmployee(rolesArray, managersArray)
        }
        )
    }
    )
}

displayTeam();
// getRoles();
