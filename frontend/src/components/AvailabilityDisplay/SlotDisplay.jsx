import React, { useState } from 'react';
import chroma from 'chroma-js';
import { useDispatch } from 'react-redux';
import {
    currentSlotRespondents,
    clearRespondents
} from '../../features/RespondentsSlice';
const SlotDisplay = (props) => {
    const dispatch = useDispatch();
    const {
        selectableKey,
        slotData,
        maxSelectedCount,
        selectedScheduleSlots,
        scheduleConfirm,
        scheduleSelect
    } = props;
    let f = chroma.scale(['#ffffff', '#e86438']);

    let scheduleSelected = false;
    console.log(selectedScheduleSlots);
    for (let x = 0; x < selectedScheduleSlots.selectedKeys.length; x++) {
        if (
            JSON.stringify(selectedScheduleSlots.selectedKeys[x]) ===
            JSON.stringify(selectableKey)
        ) {
            scheduleSelected = true;
        }
    }

    let firstSelected = false;
    let height = '';
    if (
        JSON.stringify(selectedScheduleSlots.selectedKeys[0]) ===
        JSON.stringify(selectableKey)
    ) {
        height += 15 * selectedScheduleSlots.selectedKeys.length;
        height += 'px';
        firstSelected = true;
    }

    let color =
        scheduleSelected && scheduleSelect
            ? 'purple'
            : slotData.length > 0
            ? f(slotData.length / parseFloat(maxSelectedCount)).toString()
            : 'white';

    const handleMouseEnter = () => {
        dispatch(currentSlotRespondents(slotData));
    };
    const handleMouseLeave = () => {
        dispatch(clearRespondents());
    };
    return (
        <div className='relative '>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={
                    'h-[15px] border-x-[0.2px] hover:border-dashed hover:border-[1px] hover:border-cyan-900 ' +
                    (selectableKey.i % 2 === 0
                        ? 'border-b-0 '
                        : 'border-b-[0.5px] ')
                }
                style={{ backgroundColor: color }}></div>
            {firstSelected && scheduleConfirm && (
                <div
                    className='absolute left-[10%] w-[80%] bg-purple-500 z-10 rounded-md'
                    style={{ height: height }}>
                    dhajscdaks
                </div>
            )}
        </div>
    );
};

export default SlotDisplay;

/*
            {scheduleSelected && (
                <div
                    className='bg-purple-500 w-[80%] mt-[-15px] z-10'
                    style={{ height: '150%' }}>
                    dhajscdaks
                </div>
            )}
*/
