var io = require('socket.io-client');
var socket = io.connect('1', {
    reconnection: true
});

function loadTutorial(userid, username) {
    let data = { UserID: userid, Username: username };
    socket.emit("continue", data);
    socket.on("test", function (data) {
        socket.emit("test", "hi");
        console.log("test3");
        if (data.PlayedBefore === "true") {
            console.log("test1");
        } else if (data.PlayedBefore === "false") {
            socket.emit('end');
            startTutorial(userid, username);
        }
    });
}

function startTutorial(userid, username) {
    console.log("test2");
    console.log('\033c');
    console.log("\x1b[36m", "Hello ", "\x1b[32m", username + " and welcome to Sim Hack!");
    console.log('Press any key to exit');

    setTimeout(() => {
        console.log("\x1b[36m", "Sim Hack is a game that makes it possible for you to\n Hack other players! (This is not real hacking, simply a fake virtual machine your computer will not be damaged by playing this game).\n");
    }, 2000);
  
}
module.exports = {
    loadTutorial: loadTutorial
}
