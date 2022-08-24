import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import rooms from './code.json';
const Dashboard = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

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
        <div className='transition duration-500 '>
            {/* className='flex flex-col items-center justify-center min-h-screen py-2' */}
            <div
                className={
                    'transition-all duration-500 ease-in-out transform px-2 '
                }>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Minima ratione repellendus fugit, repellat cupiditate libero
                    architecto eius sequi sed unde modi porro assumenda tempore
                    veritatis error voluptate voluptatem perspiciatis quos.
                </p>
                {/* <span>&#9776; Menu</span> */}
                <div>
                    <div>{!loading && data.code}</div>
                    <div>{!loading && data.meetupName}</div>
                    <div>{!loading && data.meetupDescription}</div>
                </div>
                <h1>Dashboard</h1>
                <button
                    onClick={() => {
                        navigate('/r/' + code + '/select', { replace: true });
                    }}>
                    Select
                </button>
                {/* <button
                    className='flex justify-center w-6 px-2 py-1 mx-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                    onClick={() => {
                        navigate('/', { replace: true });
                        localStorage.removeItem(code);
                    }}>
                    Logout
                </button> */}
            </div>
        </div>
    );
};

export default Dashboard;
