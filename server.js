const net = require('net');

let sockets = [];

const server = net.createServer(socket => {
    sockets.push(socket);
console.log('Client connected.');
socket.write('Welcome to the chat. You can write messages to other users. Type "quit" if you want to leave the chat.');

socket.on('data', data => {
    broadcast(data, socket);
    console.log('Client write a message.');
});

socket.on('error', err => {
    console.log('A client has disconnected.');
});

socket.on('close', () => {
    console.log('A client has left the chat.');
});
  
});

server.listen(5000);

function broadcast(message, socketSent) {

    if (message === 'quit') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);
        });
    }

}
