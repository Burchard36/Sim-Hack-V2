const login = require("../NodeJS Game/API/functions/loginSystem");
const mysql = require('mysql');

//Connect to mysql database
const con = mysql.createConnection({
    host: "serverhouse.now.im",
    port: "3306",
    user: "admin",
    password: "Kittens10@",
    database: 'Game'
})
function messages() {
    console.log('\033c');
    console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Welcome to Sim Hack\n\n\t\t\t\t\t\tPlease choose to:");
    console.log("\x1b[32m", "\t\t\t\t\t[login]", "\x1b[0m", "\tOR", "\x1b[32m", "\t[register]", "\x1b[0m");
    console.log("\x1b[31m", "\t\t\t\t       Options to type are 'login' or 'register'", "\x1b[0m");
}

function loadRegister() {
    messages();
    login.loginSystem();
}

loadRegister();
