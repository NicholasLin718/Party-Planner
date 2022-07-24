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
        <div className='mt-10'>
            <form onSubmit={handleClick}>
                <div className='flex flex-row '>
                    <label className='mt-1 mr-2 block text-lg font-medium text-slate-700'>
                        Code
                    </label>
                    <input
                        type='text'
                        onChange={onCodeChange}
                        className='w-full px-2 py-1 bg-white border border-slate-300 rounded-md text-MD font-medium font-sans shadow-sm
                        focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                    />
                    <button
                        type='submit'
                        className='absolute ml-[12.2rem] mt-[1px] px-2 py-1 rounded bg-rose-100 hover:bg-rose-400 ease-in duration-150'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
