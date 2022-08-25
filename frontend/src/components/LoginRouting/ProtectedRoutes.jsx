import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import UserPage from '../../pages/UserPage/UserPage';
import EnterCode from './EnterCode';
import Sidebar from '../Sidebar/Sidebar';
const ProtectedRoutes = () => {
    const { code } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
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

    let component = (
        <div>
            {' '}
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={
                    'transition-all duration-500 ease-in-out transform px-2 ' +
                    (showSidebar ? 'ml-[300px] ' : 'ml-[48px] ')
                }>
                <Outlet />
            </div>
        </div>
    );
    return isAuth ? component : <UserPage />;
};

export default ProtectedRoutes;
