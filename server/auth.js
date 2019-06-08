var http = require('http'),
    fs = require('fs');
const mysql = require("mysql");

const con = mysql.createConnection({
    host: "",
    port: "",
    user: "",
    password: "",
    database: ''
});

var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
});

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function sanitizeUsername(username) {
    return /^[0-9a-zA-Z]+$/.test(username);
}
function sanitizePassword(password) {
    return /^[0-9a-zA-Z]+$/.test(password);
}

    // Socket.io server listens to our app
    var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
    socket.on('loginUser', function (data) {
        let Username = data.Username;
        let Password = data.Password;
        con.query("SELECT * FROM Users WHERE Username = ?", [Username], function (err, fields) {
            if (err) throw err;
            if (fields[0] === "" || fields[0] === undefined || fields[0] === null) {
                var data = { StatusCode: "Failed", Reason: "Account does not exist." };
                socket.emit('loginData', data);
                return;
            } else {
                if (Password === fields[0].Password) {
                    var data = { StatusCode: "Success", Reason: "" };
                    socket.emit('loginData', data);
                } else {
                    var data = { StatusCode: "Failed", Reason: "Incorrect Username/Password." };
                    socket.emit('loginData', data);
                    return;
                }
            }
        });
    });

    socket.on('registerUser', function (data) {
        let Username = data.Username;
        let Email = data.Email;
        let Password = data.Password;
        let ConfirmPassword = data.ConfirmPassword;

        // This below checks anything that does not need a database
        if (sanitizeUsername(Username)) {
            if (Username.length <= 20) {
                if (emailIsValid(Email)) {
                    if (sanitizePassword(Password) && sanitizePassword(ConfirmPassword)) {
                        if (Password.length > 3 && ConfirmPassword.length > 3) {
                            // checks database
                            con.query("SELECT * FROM Users WHERE Username = ?", [Username], function (err, fields) {
                                if (err) throw err;
                                if (fields[0] === undefined || fields[0] === null || fields[0] === "") {
                                    con.query("SELECT * FROM Users WHERE Email = ?", [Email], function (err, fields) {
                                        if (err) throw err;
                                        if (fields[0] === undefined || fields[0] === null || fields[0] === "") {
                                            var data = { Username: Username, Email: Email, Password: Password };
                                            con.query("INSERT INTO Users SET ?", data, function (err) {
                                                if (err) throw err;
                                                var date = new Date();
                                                console.log("[", "\x1b[34m", date, "\x1b[0m", "]", "\x1b[33m", " User account created, Username: ", "\x1b[32m", Username);
                                                let data = { StatusCode: "Success", Reason: "Account succesffuly created!" };
                                                socket.emit('registerData', data);
                                                return;
                                            });
                                        } else {
                                            console.log("emits email");
                                            let data = { StatusCode: "Failed", Reason: "Email is taken!" };
                                            socket.emit('registerData', data);
                                            return;
                                        }
                                    });
                                } else {
                                    console.log("emits uername");
                                    let data = { StatusCode: "Failed", Reason: "Username is taken!" };
                                    socket.emit('registerData', data);
                                    return;
                                }
                            });
                        } else {
                            let data = { StatusCode: "Failed", Reason: "Password strength is not strong enough!" };
                            socket.emit('registerData', data);
                            return;
                        }
                    } else {
                        let data = { StatusCode: "Failed", Reason: "Password(s) contain illegal values!" };
                        socket.emit('registerData', data);
                        return;
                    }
                } else {
                    let data = { StatusCode: "Failed", Reason: "Email is invalid!" };
                    socket.emit('registerData', data);
                    return;
                }
            } else {
                let data = { StatusCode: "Failed", Reason: "Username is too longe" };
                socket.emit('registerData', data);
                return;
            }
        } else {
            let data = { StatusCode: "Failed", Reason: "Username contains illegal character" };
            socket.emit('registerData', data);
            return;
        }
        socket.removeAllListeners();
    });
});



app.listen(3000);
