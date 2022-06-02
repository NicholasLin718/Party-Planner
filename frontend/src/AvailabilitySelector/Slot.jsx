import React from 'react'
import { useState } from 'react';
export default function Slot() {
    const [select, setSelect] = useState(false);
    const handleEnter = (e) => {
        if(e.buttons === 1){
            select ? setSelect(false) : setSelect(true);
        } 
    }
    return (
        <div 
        onMouseEnter={handleEnter} className={"slot " + (select ? "selected" : "unselected")}
        onClick={() => {
                select ? setSelect(false) : setSelect(true)
            }}>
        </div>
    )
}