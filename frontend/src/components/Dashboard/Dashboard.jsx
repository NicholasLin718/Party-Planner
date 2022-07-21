import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import rooms from './code.json';
const Dashboard = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    if (localStorage.getItem('authenticated') === 'false') navigate('/');

    const logout = () => {
        navigate('/', { replace: true });
        localStorage.removeItem(code);
    };
    async function getRoom() {
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
        console.log(res);
    }
    useEffect(() => {
        getRoom();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <div>{!loading && data.code}</div>
                <div>{!loading && data.meetupName}</div>
                <div>{!loading && data.meetupDescription}</div>
            </div>
            <button
                onClick={() => {
                    navigate('/r/' + code + '/select', { replace: true });
                }}>
                Select
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
