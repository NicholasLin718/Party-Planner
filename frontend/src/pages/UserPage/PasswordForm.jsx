import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordForm = (props) => {
    const { setUserStorage, selectedUser } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [password, setPassword] = useState('');

    const onPasswordChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        setPassword(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawBody = {
            username: selectedUser,
            password: password
        };
        console.log(rawBody);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };

        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code + '/signin',
            requestOptions
        );
        const res = await response.json();
        console.log(res);
        if(res.message == "SUCCESS"){
            setUserStorage(selectedUser);
        } else{
            console.log("wrong password");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Password</label>
                <input type='text' onChange={onPasswordChange} maxLength={4} value={password}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default PasswordForm;
