const io = require('socket.io').listen(3002);
const uuid = require('uuid');

const mongoose = require('mongoose');

const messages = [];

io.on('connect', socket => {
    socket.emit('messages', messages);
    socket.on('newMessage', data => {
        messages.push({text: data.message, id: uuid.v4(), username: data.username, date: data.date});
        io.emit('messages', messages);
    });
});

