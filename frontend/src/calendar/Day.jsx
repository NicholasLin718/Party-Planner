import React from 'react'
import { useState, useEffect } from 'react';
import dayStyles from './styleCalendar';
import "./Calendar.css";
import moment from 'moment';

export default function Day(props) {
    const {day, selectedDay, selectedList, setSelectedList, currentMonth} = props;
    const [select, setSelect] = useState(false);
    const [unclickable, setUnclickable] = useState(false);

    useEffect(() => {
        setUnclickable(dayStyles(day,selectedDay, select) === "disable");
    }, [currentMonth]);

    useEffect(() => {
        if(select){
            selectedList.push(day.format("LLLL"));
        }
        else{
            let index = selectedList.indexOf(day.format("LLLL"));
            if (index !== -1) {
                selectedList.splice(index, 1);
            }
        }
        setSelectedList(selectedList);
        console.log(selectedList)
    }, [select]);

    
    return (
        <div onClick=
            {() => {
                if(!unclickable){
                    select ? setSelect(false) : setSelect(true);
                }
            }} 
            
            className={"day " + (unclickable ? "disable" : dayStyles(day, selectedDay, select)) + ((!select && !unclickable) ? " unselected" : "")}>
            <div>
                {day.format("D")}
            </div>
        </div>
    )
}

