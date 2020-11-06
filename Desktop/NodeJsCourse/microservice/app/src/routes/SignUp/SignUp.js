import React, { useState } from 'react';
import {Link, Redirect } from "react-router-dom";

import {signUp} from "../../utils/fetch";

const SignUp = () => {
    const [formData, setFormData] = useState({username: '', password: ''});
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = event => {
        setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (e, data) => {
        e.preventDefault();
        if(data.username && data.password) {
            signUp(data)
                .then(() => setIsRegistered(true))
                .catch(err => console.log('sign up err: ' + err));
        }
    }

    const token = sessionStorage.getItem('token');

    return (
        <div className="page">
            {(token && token !== 'undefined') ? <Redirect to="/"/> : null }
            <h1>Sign Up</h1>
            {isRegistered
                ? <div>Registration completed. Please sign in <Link to="/signin">here</Link></div>
                : <>
                    <form className="form" onSubmit={(e) => handleSubmit(e, formData)}>
                        <input type="text" name="username" onChange={handleChange}/>
                        <input type="password" name="password" onChange={handleChange}/>
                        <button>Sign up</button>
                    </form>
                    <div style={{textAlign: 'center'}}>Already have an account? <Link to="/signin">Sign in</Link></div>
                </>
            }
        </div>
    )
};

export default SignUp;