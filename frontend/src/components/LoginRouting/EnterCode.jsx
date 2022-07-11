import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import rooms from './code.json';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        if (!res) alert('no room');
        else navigate('/r/' + code);
    }

    const handleClick = (e) => {
        e.preventDefault();
        getRoom();
    };

    const [code, setCode] = useState('');

    const onCodeChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleClick}>
                <br></br>
                <label>Code</label>
                <input type='text' onChange={onCodeChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Login;
