import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Login from './EnterCode';

const ProtectedRoutes = () => {
    const { code } = useParams();
    const isAuth = localStorage.getItem(code) === 'true';
    return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
