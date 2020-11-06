import React, { useState, useContext } from 'react';
import {Link, Redirect} from "react-router-dom";

import {signIn} from "../../utils/fetch";
import {UserContext} from "../../App";

import './signIn.css';

const SignUp = props => {
    const [formData, setFormData] = useState({username: '', password: ''});
    const [token, setToken] = useState(sessionStorage.getItem('token'));

    const {setCurrentUser} = useContext(UserContext)

    const handleChange = event => {
        setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!token || token === 'undefined') {
            signIn(formData).then(data => {
                setToken(data?.accessToken);
                window.sessionStorage.setItem('token', data?.accessToken);
                setCurrentUser(data.username);
                props.history.push('/');
            });
        }
    };

    return (
        <div className="page">
            {(token && token !== 'undefined') ? <Redirect to="/" /> : null}
            <h1>Sign In</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username"/>
                <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password"/>
                <button>Sign in</button>
            </form>
            <div style={{textAlign: 'center'}}>Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
    )
};

export default SignUp;