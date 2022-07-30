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

const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
const UserCard = (props) => {
    const { username, password, sprite } = props;
    const avatar = spriteArr[sprite];
    return (
        <div className='w-[80%] flex'>
            <div className='bg-white inline-block overflow-hidden w-10 pb-10 h-0 rounded-full relative border-neutral-900 border-[1px]'>
                <img
                    src={avatar}
                    className='w-[105%] h-[105%] absolute rounded-full object-cover'
                />
            </div>
            <div>{username}</div>
            <div>{password}</div>
        </div>
    );
};

export default UserCard;
