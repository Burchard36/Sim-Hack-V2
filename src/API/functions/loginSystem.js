const readline = require('readline');
var io = require('socket.io-client');
var socket = io.connect('1', {
    reconnection: true
});
const sys = require("../functions/tryTutorial");

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
                                process.stdout.write('\033c');
                                console.log("\x1b[31m", "\t\t\t\t\t       " + data.Reason);
                                setTimeout(function () {
                                    restartSystem();
                                    return;
                                }, 2000);
                            } else if (data.StatusCode === "Success") {
                                console.log("test Success");
                                socket = io.connect('1', {
                                    reconnection: true
                                });
                                socket.emit('pass', data);
                                process.stdout.write('\033c');
                                console.log("\x1b[32m", "\x1b[5m", "\t\t\t\t     " + data.Reason);
                                socket.on("passData", function (data) {
                                    console.log("test passData");
                                    if (data.StatusCode === "Failed") {
                                        // If failed to authenticate to game server get the fuck out
                                        process.stdout.write('\033c');
                                        console.log("\x1b[31m", "\t\t\t\t\t       " + data.Reason);
                                        setTimeout(function () {
                                            restartSystem();
                                            return;
                                        }, 2000);
                                    } else if (data.StatusCode === "Success") {
                                        // get some data bro
                                     
                                       // socket.emit("continue", data);
                                        console.log("test continue");
                                        sys.loadTutorial(data.UserID, data.Username);
                                    }
                                })
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
                                        console.log("\x1b[31m", "\t\t\t\t\t       " + data.Reason);
                                        setTimeout(function () {
                                            restartSystem();
                                            return;
                                        }, 2000);
                                    } else if (data.StatusCode === "Pass") {
                                        console.log("\x1b[31m");
                                        console.log("\x1b[32m", "\x1b[5m", "\t\t\t\t\tAccount successfully registered you may now login! (Redirecting)");
                                        setTimeout(function () {
                                            restartSystem();
                                            return;
                                        }, 2000);
                                        return 2;
                                   
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
