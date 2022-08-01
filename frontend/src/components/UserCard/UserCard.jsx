import React from 'react';
import S1 from '../Sprites/S1.png';
import S2 from '../Sprites/S2.png';
import S3 from '../Sprites/S3.png';
import S4 from '../Sprites/S4.png';
import S5 from '../Sprites/S5.png';
import S6 from '../Sprites/S6.png';
import S7 from '../Sprites/S7.png';
import S8 from '../Sprites/S8.png';
import S9 from '../Sprites/S9.png';
import S10 from '../Sprites/S10.png';
import S11 from '../Sprites/S11.png';
import S12 from '../Sprites/S12.png';
import { useState } from 'react';
import PasswordForm from '../../pages/UserPage/PasswordForm';

const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
const UserCard = (props) => {
    const { user, setUserStorage } = props;

    const { username, password, sprite } = user;
    const [requirePassword, setRequirePassword] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const avatar = spriteArr[sprite];

    const handleUserClick = (username) => {
        // const curUser = data.users.find((user) => {
        //     return user.username === username;
        // });
        setSelectedUser(username);
        if (password === '') setUserStorage(username);
        else setRequirePassword(true);
    };
    return (
        <div className='flex align-center rounded-md bg-rose-300 border-neutral-900 border-2 px-4 py-4'>
            <div className='bg-white inline-block overflow-hidden w-16 pb-16 h-0 rounded-full relative border-neutral-900 border-[1px]'>
                <img
                    src={avatar}
                    className='w-[105%] h-[105%] absolute rounded-full object-cover'
                />
            </div>
            <div className='px-5'>
                <div className='text-xl font-mono font-semibold'>
                    {username}
                </div>
                <button
                    className='block w-16 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'
                    onClick={() => {
                        handleUserClick(username);
                    }}>
                    Select
                </button>
            </div>
            <div>
                {requirePassword && (
                    <PasswordForm
                        setUserStorage={setUserStorage}
                        selectedUser={selectedUser}
                    />
                )}
            </div>
        </div>
    );
};

export default UserCard;
