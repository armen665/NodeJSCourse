import React, {useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import {UserContext} from "../../App";

import './chat.css';

const Chat = () => {
    const token = sessionStorage.getItem('token');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const {currentUser} = useContext(UserContext);

    const socket = io('http://localhost:3002');

    useEffect(() => {

        socket.on('connect', () => {
            socket.on('messages', data => {
                console.log('client on messages')
                setMessages(data);
            });
        })
    }, [])

    const handleChange = event => {
        setInput(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('newMessage', {message: input, username: currentUser, date: new Date()});
        setInput('');
    }


    return (
        <div className="chatPage">
            {!token || token === 'undefined' ? <Redirect to="signin"/> : null}
            <h1>Messages</h1>
            {messages.map(message => (
                <div key={message.id} className="message">
                    <div className="flex">
                        <h5>{message.username}</h5>
                        <div className="date">{new Date(message.date).toLocaleString([], {year: 'numeric', month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false})}</div>
                    </div>
                    <p>{message.text}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" onChange={handleChange} value={input}/>
                <button disabled={!input}>Send</button>
            </form>
        </div>
    )
};

export default Chat;