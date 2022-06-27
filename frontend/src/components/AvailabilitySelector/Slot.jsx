import React from 'react';
import { useState } from 'react';
export default function Slot(props) {
    //{hour: 7, is_00: false, selected: false}
    const { slotData, index, setSingleColumn } = props;
    const [slots, setSlots] = useState(slotData);
    const [select, setSelect] = useState(slotData.selected);
    const handleEnter = (e) => {
        if (e.buttons === 1) {
            select ? setSelect(false) : setSelect(true);
            setSlots({ ...slotData, selected: select });
            console.log({ ...slotData, selected: select });
        }
    };

    const handleMouseDown = () => {
        select ? setSelect(false) : setSelect(true);
        setSlots({ ...slotData, selected: select });
        console.log({ ...slotData, selected: select });
    };

    return (
        <div>
            <div
                onMouseEnter={handleEnter}
                onMouseDown={handleMouseDown}
                className={
                    'slot ' + (select ? 'selected' : 'unselected')
                }></div>
            {/* <h1>{Math.random()*5}</h1> */}
        </div>
    );
}
