import axios from 'axios';

export const signUp = userData => {
    return axios.post('http://localhost:3001/api/1/signup', userData)
        .then(data => data.data)
        .catch(err => console.log('signup error: ' + err));
};

export const signIn = userData => {
    return axios.post('http://localhost:3001/api/1/signin', userData)
        .then(data => data.data)
        .catch(err => console.log('signin error: ' + err));
};

export const getUsers = token => {
    return axios.get('https://localhost:3001/api/1/me')
        .then(data => data.data)
        .catch(err => console.log('get users error: ' + err));
};