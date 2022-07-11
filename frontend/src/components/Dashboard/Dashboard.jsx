import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import rooms from './code.json';
const Dashboard = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    if (localStorage.getItem('authenticated') === 'false') navigate('/');

    const handleClick = () => {
        navigate('/', { replace: true });
        localStorage.removeItem(code);
    };
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        console.log(res);
    }
    useEffect(() => {
        getRoom();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <div>{data.code}</div>
                <div>{data.meetupName}</div>
                <div>{data.meetupDescription}</div>
            </div>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default Dashboard;
