import React from 'react'
import { useState, useEffect } from 'react';
import dayStyles from './styleCalendar';
import storeDays from './storeDays';
import "./Calendar.css";
import moment from 'moment';

export default function Day({day, selectedDay, selectedList, currentMonth}) {
    const [select, setSelect] = useState(false);
    const [clickable, setClickable] = useState(false);

    useEffect(() => {
        setClickable(dayStyles(day,selectedDay, select) === "disable");
    }, [currentMonth]);

    useEffect(() => {
        // if(select){
        //     selectedList.push(day);
        // }
        // else{
        //     let index = selectedList.indexOf(day);
        //     if (index !== -1) {
        //         selectedList.splice(index, 1);
        //     }
        // }
    }, [select]);

    
    return (
        <div onClick=
            {() => {
                select ? setSelect(false) : setSelect(true);
                storeDays(day, select); //even though we setState above, the select value is still the old value as setState does not instantly update
            }} 
            
            className={clickable ? "disable" : dayStyles(day, selectedDay, select)}>
            <div>
                {day.format("D")}
            </div>
        </div>
    )
}

