import React from 'react';
import { useState } from 'react';
export default function Slot(props) {
    const { selectableKey, slotData, slotArrays, setSlotArrays } = props;
    const { i, j, k } = selectableKey;

    const [selectedSlot, setSelectedSlot] = useState(slotData.selected);

    const handleClick = () => {
        let tempSlotArray = slotArrays.slice();
        tempSlotArray[k][j].slots[i].selected =
            !tempSlotArray[k][j].slots[i].selected;
        setSelectedSlot(tempSlotArray[k][j].slots[i].selected);
        setSlotArrays(tempSlotArray);
    };
    return (
        <div>
            <div
                onClick={handleClick}
                className={
                    'slot ' + (slotData.selected ? 'selected' : 'unselected')
                }></div>
        </div>
    );
}
