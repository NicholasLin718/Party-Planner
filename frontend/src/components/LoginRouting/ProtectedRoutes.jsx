import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import UserPage from '../../pages/UserPage/UserPage';
import EnterCode from './EnterCode';

const ProtectedRoutes = () => {
    const { code } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    async function getRoom() {
        //need error handling
        const response = await fetch('http://localhost:5000/pages/' + code);
        const res = await response.json();
        setData(res);
        setLoading(false);
    }
    useEffect(() => {
        getRoom();
    }, []);

    const isAuth = localStorage.getItem(code);

    return isAuth && !loading && data ? <Outlet /> : <UserPage />;
};

export default ProtectedRoutes;
