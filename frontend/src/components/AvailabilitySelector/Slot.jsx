import React from 'react';
import { useState } from 'react';
export default function Slot(props) {
    const {
        selectableKey,
        slotData,
        slotArrays,
        setSlotArrays,
        booleanSelect,
        setBooleanSelect
    } = props;
    const { i, j, k } = selectableKey;

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
                onMouseDown={() => {
                    setBooleanSelect(!slotArrays[k][j].slots[i]);
                }}
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
