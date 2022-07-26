import React from 'react';
import { useState, useEffect } from 'react';
import dayStyles from './styleCalendar';
import './Calendar.css';
import moment from 'moment';

export default function Day(props) {
    const { day, selectedDay, selectedList, setSelectedList, currentMonth } =
        props;
    const [select, setSelect] = useState(false);
    const [unclickable, setUnclickable] = useState(false);

    useEffect(() => {
        setUnclickable(dayStyles(day, selectedDay, select) === 'disable');
    }, [currentMonth]);

    useEffect(() => {
        const date = new Date(day.toISOString());
        if (select) {
            if (
                !selectedList.some((item) => item.isoTime === day.toISOString())
            ) {
                selectedList.push({
                    isoTime: day.toISOString(),
                    dayOfWeek: date.getDay()
                });
            }
        } else {
            let index = selectedList
                .map((object) => object.isoTime)
                .indexOf(day.toISOString());
            if (index != -1) {
                selectedList.splice(index, 1);
            }
        }
        setSelectedList(
            selectedList
                .slice()
                .sort((a, b) => a.isoTime.localeCompare(b.isoTime))
        );
    }, [select]);

    return (
        <div
            onClick={() => {
                if (!unclickable) {
                    select ? setSelect(false) : setSelect(true);
                }
            }}
            className={
                'rounded-[20%] ml-[1.5%] mr-[1.5%] sm:ml-[4%] sm:mr-[4%] calendar-alignment ' +
                (unclickable
                    ? 'disable'
                    : dayStyles(day, selectedDay, select)) +
                (!select && !unclickable ? ' unselected' : '')
            }>
            <div className='font-mono text-xl'>{day.format('D')}</div>
        </div>
    );
}
