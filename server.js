const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_name,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// db.end();

module.exports = db;