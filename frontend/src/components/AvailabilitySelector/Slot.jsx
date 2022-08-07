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

    const [selectedSlot, setSelectedSlot] = useState(slotData.selected);
    const handleClick = () => {
        let tempSlotArray = slotArrays.slice();
        tempSlotArray[k][j].slots[i].selected = booleanSelect;
        setSelectedSlot(tempSlotArray[k][j].slots[i].selected);
        setSlotArrays(tempSlotArray);
    };
    return (
        <div>
            <div
                onClick={handleClick}
                className={
                    'h-[15px] outline-[0.5px] outline-dashed ' +
                    (slotData.selected
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
