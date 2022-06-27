import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rooms from './code.json';
const Dashboard = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    if (localStorage.getItem('authenticated') === 'false') navigate('/');

    const handleClick = () => {
        navigate('/', { replace: true });
        localStorage.removeItem(code);
    };

    let index = rooms.findIndex((room) => {
        return room.code === code;
    });

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {rooms[index].data}
                <br></br>
                {rooms[index].code}
            </div>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default Dashboard;
