const io = require('socket.io').listen(3002);

const {Message} = require('../db/index');

let messages = [];

io.on('connect', socket => {
    Message.find({}, (err, data) => {
        if(err) {
            return 'Something went wrong'
        }
        socket.emit('messages', data);
        messages = data;
    })
    socket.on('newMessage', data => {
        const newMessage = {message: data.message, user: data.username};
        Message.create(newMessage, err => {
            if(err) {
                return console.log('Something went wrong');
            }
            console.log('emit messages')
            messages.push(newMessage);
            socket.emit('messages', messages);
        })

    });
});

