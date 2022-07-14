import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RegisterForm = (props) => {
    const { setUserStorage } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawBody = {
            $push: { users: { username: username, password: password } }
        };
        //most likely need to fetch full thing and then update users
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code,
            requestOptions
        );
        console.log(response);
        setUserStorage(username);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' onChange={onUsernameChange} />
                <label>Password (Optional)</label>
                <input type='text' onChange={onPasswordChange} />
                <button type='submit'>Add new user</button>
            </form>
        </div>
    );
};

export default RegisterForm;
