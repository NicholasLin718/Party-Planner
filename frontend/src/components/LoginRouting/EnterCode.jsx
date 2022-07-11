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

    const [username, setUsername] = useState(
        localStorage.getItem('username') ? localStorage.getItem('username') : ''
    );
    const [code, setCode] = useState(
        localStorage.getItem('code') ? localStorage.getItem('code') : ''
    );

    // const onUsernameChange = (e) => {
    //     setUsername(e.target.value);
    // };
    const onCodeChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleClick}>
                {/* <label>Name</label>
                <input
                    type='text'
                    value={username ? username : ''}
                    onChange={onUsernameChange}
                /> */}
                <br></br>
                <label>Code</label>
                <input type='text' onChange={onCodeChange} />
                <button
                    type='submit'
                    onClick={() => {
                        // console.log(`Form submitted, ${username}`);
                        // let index = rooms.findIndex((room) => {
                        //     console.log(room.code);
                        //     return room.code === code;
                        // });
                        // if (index !== -1) {
                        //     localStorage.setItem('username', username);
                        //     localStorage.setItem('code', code);
                        //     localStorage.setItem(code, true);
                        //     if (!rooms[index].participants.includes(username)) {
                        //         rooms[index].participants.push(username);
                        //         console.log(rooms[index].participants);
                        //     }
                        // }
                        console.log('submitted');
                    }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
