import React from 'react';
import { useState } from 'react';
export default function Slot(props) {
    const { selectableKey, slotData, slotArrays, setSlotArrays } = props;
    const [selectedSlot, setSelectedSlot] = useState(slotData.selected);

    const handleClick = () => {
        console.log('hi');
        let tempSlotArray = slotArrays.slice();
        tempSlotArray[selectableKey.j].slots[selectableKey.i].selected =
            !tempSlotArray[selectableKey.j].slots[selectableKey.i].selected;
        setSelectedSlot(
            tempSlotArray[selectableKey.j].slots[selectableKey.i].selected
        );
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
