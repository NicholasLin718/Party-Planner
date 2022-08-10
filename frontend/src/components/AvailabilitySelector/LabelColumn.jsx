import React, { useState } from 'react';
import './selectorStyles.css';

export default function LabelColumn(props) {
    const { startValue, endValue, timeZone } = props;

    let columnArr = [];
    let hour = startValue.hour;
    let is_00 = startValue.is_00;
    while (hour < endValue.hour) {
        //7:30 - 15:30
        if (is_00) {
            if (hour === 12) columnArr.push('12pm');
            else if (hour === 0) columnArr.push('12am');
            else columnArr.push(hour > 12 ? hour - 12 + 'pm' : hour + 'am');
            is_00 = !is_00;
            columnArr.push(' ');
            is_00 = !is_00;
        } else {
            columnArr.push(' ');
            is_00 = !is_00;
        }
        hour++;
    }
    if (!endValue.is_00) {
        if (hour === 12) columnArr.push('12pm');
        else if (hour === 0) columnArr.push('12am');
        else columnArr.push(hour > 12 ? hour - 12 + 'pm' : hour + 'am');
    }
    console.log(columnArr);
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
