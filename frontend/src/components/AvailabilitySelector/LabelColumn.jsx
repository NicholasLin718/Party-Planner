import React, { useState } from 'react';
import './selectorStyles.css';

export default function LabelColumn(props) {
    const { startValue, endValue, timeZone } = props;

    let columnArr = [];
    let hour = startValue;
    while (hour < endValue) {
        //7:30 - 15:30
        if (hour % 2 === 0) {
            let str = hour / 2;
            if (str === 0) str = 12;
            if (str > 12) str -= 12;
            if (hour > 23) str += 'pm';
            else str += 'am';
            columnArr.push(str);
        } else {
            columnArr.push(' ');
        }
        hour++;
    }

    return (
        <div className='px-2'>
            <div className='flex justify-end font-mono '>{timeZone}</div>
            <div className='flex justify-end font-mono text-sm'>{'————'}</div>
            {columnArr.map((time, i) => (
                <div key={i}>
                    <div
                        className='flex justify-end h-[15px] text-[10px] font-mono font-medium'
                        key={i}>
                        {time}
                    </div>
                </div>
            ))}
        </div>
    );
}
