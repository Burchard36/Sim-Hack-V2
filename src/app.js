console.log('\033[2J');
process.stdout.write('\033c');
const mysql = require('mysql');
const login = require('../API/functions/loginSystem.js');

//Connect to mysql database
const con = mysql.createConnection({
    host: "null",
    port: "null",
    user: "null",
    password: "null",
    database: 'null'
})

console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Welcome to Sim Hack\n\n\t\t\t\t\t\tPlease choose to:");
console.log("\x1b[32m", "\t\t\t\t\t[login]", "\x1b[0m", "\tOR", "\x1b[32m", "\t[register]", "\x1b[0m");
console.log("\x1b[31m", "\t\t\t\t       Options to type are 'login' or 'register'", "\x1b[0m");

login.loginSystem();
