import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faSquarePollVertical,
    faCalendarCheck,
    faListCheck,
    faGear,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const Sidebar = (props) => {
    const navigate = useNavigate();
    const { code } = useParams();
    const { showSidebar, setShowSidebar } = props;

    const navbarContent = [
        { name: 'Home', icon: faHome, url: `/r/${code}` },
        {
            name: 'Select Availability',
            icon: faCalendarCheck,
            url: `/r/${code}/select`
        },
        { name: 'Polls', icon: faSquarePollVertical, url: `/r/${code}/polls` },
        { name: 'Tasks', icon: faListCheck, url: `/r/${code}/tasks` },
        {
            name: 'How it Works',
            icon: faQuestion,
            url: `/r/${code}/how-it-works`
        }
    ];
    return (
        <div className='relative h-0'>
            <div
                className={
                    showSidebar
                        ? 'z-50 top-0 left-0 w-[300px] bg-slate-800 p-6 text-white fixed h-full ease-in-out duration-200 translate-x-0 '
                        : 'z-50 flex flex-col fixed h-full min-h-screen w-12 bg-slate-800 ease-in-out duration-200 -translate-x-0 '
                }>
                {showSidebar ? (
                    <button
                        className='flex text-4xl text-white items-center cursor-pointer float-right top-6 z-50'
                        onClick={() => setShowSidebar(!showSidebar)}>
                        &#10006;
                    </button>
                ) : (
                    <div
                        onClick={() => setShowSidebar(!showSidebar)}
                        className='text-center mt-4 cursor-pointer z-50'>
                        <span className='text-3xl text-white'>&#9776;</span>
                    </div>
                )}
                <div className='mt-20 clear-both'>
                    {navbarContent.map((item) => (
                        <div
                            onClick={() => navigate(item.url)}
                            className={
                                'link decoration-0 text-2xl py-4 text-slate-100 block transition duration-300 border-b-[1px] border-blue-50 hover:text-rose-400 hover:cursor-pointer ' +
                                (showSidebar ? '' : 'text-center')
                            }>
                            <FontAwesomeIcon icon={item.icon} />
                            {showSidebar && (
                                <span className='px-2'>{item.name}</span>
                            )}
                        </div>
                    ))}
                </div>
                {showSidebar && (
                    <div className='flex justify-center'>
                        <button
                            className='mt-20 w-60 px-2 py-1 mx-1 rounded text-slate-800 text-mono bg-rose-100 border-2 border-rose-200 hover:bg-rose-400 ease-in duration-150'
                            onClick={() => {
                                navigate('/', { replace: true });
                                localStorage.removeItem(code);
                            }}>
                            Logout
                        </button>
                    </div>
                )}
                <div
                    className={
                        'absolute bottom-0' + (showSidebar ? ' ' : ' w-12')
                    }>
                    <div
                        className={
                            'decoration-0 text-2xl py-4 text-slate-100 block transition duration-300 border-b-[1px] border-blue-50 ' +
                            (showSidebar ? '' : 'text-center')
                        }>
                        <FontAwesomeIcon icon={faGear} />
                        {showSidebar && <span className='px-2'>Settings</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
