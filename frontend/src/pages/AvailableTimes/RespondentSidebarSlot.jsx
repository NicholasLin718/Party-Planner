import S1 from '../../components/Sprites/S1.png';
import S2 from '../../components/Sprites/S2.png';
import S3 from '../../components/Sprites/S3.png';
import S4 from '../../components/Sprites/S4.png';
import S5 from '../../components/Sprites/S5.png';
import S6 from '../../components/Sprites/S6.png';
import S7 from '../../components/Sprites/S7.png';
import S8 from '../../components/Sprites/S8.png';
import S9 from '../../components/Sprites/S9.png';
import S10 from '../../components/Sprites/S10.png';
import S11 from '../../components/Sprites/S11.png';
import S12 from '../../components/Sprites/S12.png';

import React, { useEffect, useState } from 'react';

const RespondentSidebarSlot = (props) => {
    const {
        // setRepondentCount,
        // respondentCount,
        user,
        availableRespondentList,
        setSelectedIndividual,
        setShowIndividual
    } = props;
    const spriteArr = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];

    const isAvailable = availableRespondentList.some((element) => {
        if (element.username === user.username) {
            return true;
        }
    });

    return (
        <div
            onMouseEnter={() => {
                setShowIndividual(true);
                setSelectedIndividual(user);
            }}
            onMouseLeave={() => {
                setShowIndividual(false);
                setSelectedIndividual({});
            }}
            className={
                'max-w-[300px] items-center cursor-pointer justify-between space-x-6 py-[10px] font-medium text-slate-700 ' +
                (!isAvailable ? 'opacity-20 line-through' : 'opacity-100 ')
            }>
            <div className='mt-[-3px] bg-white inline-block overflow-hidden w-8 h-8 rounded-full absolute  outline-1 outline'>
                <img
                    src={spriteArr[user.sprite]}
                    className='w-[105%] h-[105%] absolute rounded-full object-cover'
                />
            </div>
            <div className='px-5 ml-8 w-auto overflow-hidden text-ellipsis'>
                {user.username}
            </div>
        </div>
    );
};

export default RespondentSidebarSlot;
