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
                        ? 'z-50 top-0 left-0 w-[300px] bg-slate-800 p-6 text-white fixed h-full ease-in-out duration-300 translate-x-0 overflow-x-hidden overflow-y-auto'
                        : 'z-50 w-12 bg-slate-800 fixed h-full min-h-screen ease-in-out duration-300 -translate-x-0 '
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
                    {navbarContent.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(item.url)}
                            className={
                                'group link overflow-hidden decoration-0 text-2xl py-4 text-slate-100 block border-b-[1px] border-blue-50 hover:text-rose-400 hover:cursor-pointer ease-in-out duration-150 whitespace-nowrap ' +
                                (showSidebar ? '' : 'text-center')
                            }>
                            <FontAwesomeIcon icon={item.icon} />
                            <span className='invisible text-sm w-auto bg-gray-900 text-slate-50 text-center rounded-md px-5 absolute z-1 left-[110%] group-hover:visible'>
                                {item.name}
                            </span>

                            {/* absolute top-1/2 right-full mt-[-5px] border-2 bor */}
                            {showSidebar && (
                                <span className='px-2 '>{item.name}</span>
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
                {/* <div
                    className={
                        'fixed bottom-0 bg-slate-900 ease-in-out duration-300' +
                        (showSidebar ? ' ml-[-24px] pl-6 w-[300px]' : ' w-12')
                    }>
                    <div
                        className={
                            'decoration-0 text-2xl py-4 text-slate-100 block whitespace-nowrap hover:text-rose-400 hover:cursor-pointer ease-in-out duration-150 ' +
                            (showSidebar ? '' : 'text-center ')
                        }>
                        <FontAwesomeIcon icon={faGear} />
                        {showSidebar && <span className='px-2'>Settings</span>}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
