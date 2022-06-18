import React from 'react'
import { useState } from 'react';
export default function Slot(props) {
    const {slotData} = props;
    const [select, setSelect] = useState(slotData.selected);
    const handleEnter = (e) => {
        if(e.buttons === 1){
            select ? setSelect(false) : setSelect(true);
        } 
    }

    const handleMouseDown = () => {
        select ? setSelect(false) : setSelect(true)
    }
    
    return (
        <div>
            <div onMouseEnter={handleEnter} onMouseDown={handleMouseDown}  className={"slot " + (select ? "selected" : "unselected")}></div>
            {/* <h1>{Math.random()*5}</h1> */}
        </div>
    )
}
