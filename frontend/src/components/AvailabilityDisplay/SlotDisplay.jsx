import React, { useState } from 'react';
import chroma from 'chroma-js';
import { useDispatch } from 'react-redux';
import {
    currentSlotRespondents,
    clearRespondents
} from '../../features/RespondentsSlice';
const SlotDisplay = (props) => {
    const dispatch = useDispatch();
    const { selectableKey, slotData, maxSelectedCount } = props;
    let f = chroma.scale(['#ffffff', '#e86438']);

    let color =
        slotData.length > 0
            ? f(slotData.length / parseFloat(maxSelectedCount)).toString()
            : 'white';

    const handleMouseEnter = () => {
        dispatch(currentSlotRespondents(slotData));
    };
    const handleMouseLeave = () => {
        dispatch(clearRespondents());
    };
    return (
        <div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={
                    'h-[15px] border-x-[0.2px] ' +
                    (selectableKey.i % 2 === 0
                        ? 'border-b-0 '
                        : 'border-b-[0.5px] ')
                }
                style={{ backgroundColor: color }}></div>
        </div>
    );
};

export default SlotDisplay;
