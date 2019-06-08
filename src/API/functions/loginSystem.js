const readline = require('readline');
var io = require('socket.io-client');
var socket = io.connect('http://serverhouse.now.im:3000', {
    reconnection: true
});
const mysql = require('mysql');

//Connect to mysql database
const con = mysql.createConnection({
    host: "",
    port: "",
    user: "",
    password: "",
    database: ''
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function messages() {
    console.log('\033c');
    console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Welcome to Sim Hack\n\n\t\t\t\t\t\tPlease choose to:");
    console.log("\x1b[32m", "\t\t\t\t\t[login]", "\x1b[0m", "\tOR", "\x1b[32m", "\t[register]", "\x1b[0m");
    console.log("\x1b[31m", "\t\t\t\t       Options to type are 'login' or 'register'", "\x1b[0m");
}

function loginSystem() {
    const collecter = function () {
        rl.question('', (answer) => {
            if (answer.toUpperCase() === "LOGIN") {
                console.log('\033[2J');
                process.stdout.write('\033c');
                console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Type your username.");

                rl.question('', (username) => {
                    let UserName = username;
                    process.stdout.write('\033c');
                    console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Type your password.");

                    rl.question('', (password) => {
                        let Password = password;
                        process.stdout.write('\033c');
                        console.log('\x1b[32m', "\t\t\t\t\t       Type your password.");

                        let data = { Username: UserName, Password: Password };
                        socket.emit('loginUser', data);
                        socket.on('loginData', function (data) {
                            if (data.StatusCode === "Failed") {

                            } else if (data.StatusCode === "Success") {
                                var socket = io.connect('http://serverhouse.now.im:3000', {
                                    reconnection: true
                                });

                            }
                        });
                    });
                });
            } else if (answer.toUpperCase() === "REGISTER") {
                console.log('\033[2J');
                process.stdout.write('\033c');
                console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Type your preffered username.");

                rl.question('', (username) => {
                    let userName = username;
                    console.log('\033[2J');
                    process.stdout.write('\033c');
                    console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Type your preffered email.");

                    rl.question('', (email) => {
                        let userEmail = email;
                        console.log('\033[2J');
                        process.stdout.write('\033c');
                        console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Type your preffered password.");

                        rl.question('', (password) => {
                            let userPassword = password;
                            console.log('\033[2J');
                            process.stdout.write('\033c');
                            console.log('\x1b[36m%s\x1b[0m', "\t\t\t\t\t       Please confirm your password.");

                            rl.question('', (confirmPassword) => {
                                let userConfirmPassword = confirmPassword;
                                console.log('\033[2J');
                                process.stdout.write('\033c');

                                let data = { Username: userName, Email: userEmail, Password: userPassword, ConfirmPassword: userConfirmPassword };
                                socket.emit('registerUser', data);
                                socket.on('registerData', function (data) {
                                    if (data.StatusCode === "Failed") {
                                        console.log("\x1b[31m", data.Reason);
                                        setTimeout(function () {
                                            restartSystem();
                                            return;
                                        }, 2000);
                                    } else if (data.statusCode === "Success") {
                                        console.log("\x1b[31m");
                                        console.log("\x1b[32m", "Sending requests to Sim Hack server...");
                                    }
                                    socket.removeAllListeners();
                                });
                            })
                        })
                    })
                })
            } else {
                console.log("\x1b[31m", "Invalid option! you typed: " + answer, "\x1b[0m");
                collecter();
            }
        });
    }
    collecter();
}
function restartSystem() {
    messages();
    loginSystem();
    return;
}

module.exports = {
    loginSystem: loginSystem
}
