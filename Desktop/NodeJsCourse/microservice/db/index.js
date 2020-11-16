const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://armen:6658@cluster0.t3naj.mongodb.net/chat?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once("open", function() {
    console.log("Connection Successful!");
});

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    user: String
}, {timestamps: {createdAt: 'created_at', updatedAt: false}});
const usersSchema = new Schema({
    username: {
        type: String,
        index: true,
        unique: [true, "User already exists."],
        required: [true, 'Email address is required.'],
    },
    password: String
});

const Message = mongoose.model('Message', messageSchema, 'messages');
const User = mongoose.model('User', usersSchema, 'users');

module.exports = {Message, User};