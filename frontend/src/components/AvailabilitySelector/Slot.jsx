import React from 'react';
import { useState } from 'react';
export default function Slot(props) {
    const {
        selectableKey,
        slotData,
        slotArrays,
        setSlotArrays,
        booleanSelect
    } = props;
    const { i, j, k } = selectableKey;

    console.log(i);
    const [selectedSlot, setSelectedSlot] = useState(slotData);
    const handleClick = () => {
        let tempSlotArray = slotArrays.slice();
        tempSlotArray[k][j].slots[i] = booleanSelect;
        setSelectedSlot(tempSlotArray[k][j].slots[i]);
        setSlotArrays(tempSlotArray);
    };
    return (
        <div>
            <div
                onClick={handleClick}
                className={
                    'h-[15px] border-x-[0.2px] ' +
                    (i % 2 === 0 ? 'border-b-0 ' : 'border-b-[0.5px] ') +
                    (slotData
                        ? 'selected' +
                          (!booleanSelect
                              ? ' hover:cursor-pointer'
                              : ' hover:cursor-default')
                        : 'unselected' +
                          (booleanSelect
                              ? ' hover:cursor-pointer'
                              : ' hover:cursor-default'))
                }></div>
        </div>
    );
}
