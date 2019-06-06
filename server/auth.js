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

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
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
                        if (Password.length > 3 && ConfirmPassword > 3) {
                            con.query("SELECT * FROM 'Users' WHERE 'Username' = ?", [Username], function (err, fields) {
                                if (err) throw err;
                                if (fields[0] === undefined || fields[0] === null || fields[0] === "") {
                                    con.query("SELECT * FROM 'Users' WHERE 'Email' = ?", [Email], function (err, fields) {
                                        if (err) throw err;
                                        if (fields[0] === undefined || fields[0] === null || fields[0] === "") {

                                        } else {
                                            let data = { StatusCode: "Failed", Reason: "Email is taken!" };
                                            socket.emit('registerData', data);
                                            return;
                                        }
                                    })
                                } else {
                                    let data = { StatusCode: "Failed", Reason: "Username is taken!" };
                                    socket.emit('registerData', data);
                                    return;
                                }
                            }).catch(console.error);
                        } else {
                            let data = { StatusCode: Failed, Reason: "Password strength is not strong enough!" };
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
                let data = { StatusCode: "Failed", Reason: "Username is too longer" };
                socket.emit('registerData', data);
                return;
            }
        } else {
            let data = { StatusCode: "Failed", Reason: "Username contains illegal character" };
            socket.emit('regsiterData', data);
            return;
        }
    }
});


app.listen(3000);
