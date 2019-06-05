const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loginSystem() {
    const collecter = function () {
        rl.question('', (answer) => {
            if (answer.toUpperCase() === "LOGIN") {
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

                                let data = {Username: userName, }
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

module.exports = {
    loginSystem: loginSystem
}
