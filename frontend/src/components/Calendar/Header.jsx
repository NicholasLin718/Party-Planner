import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronCircleRight,
    faChevronCircleLeft
} from '@fortawesome/free-solid-svg-icons';
export default function Header({
    selectedDay,
    setSelectedDay,
    currentMonth,
    setCurrentMonth
}) {
    function prevMonth() {
        return selectedDay.clone().subtract(1, 'month');
    }

    function nextMonth() {
        return selectedDay.clone().add(1, 'month');
    }

    function currMonth() {
        return selectedDay.isSame(new Date(), 'month');
    }

    const handleClick = (way) => {
        way === 'left'
            ? setCurrentMonth(currentMonth > 0 ? currentMonth - 1 : 0)
            : setCurrentMonth(currentMonth < 36 ? currentMonth + 1 : 36);
    };

    return (
        <div className='header'>
            {console.log(currentMonth)}
            {currentMonth > 0 && (
                <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    className='fixed top-50 bottom-3 left-5 m-auto text-4xl cursor-pointer select-none'
                    onClick={() => {
                        currentMonth !== 0 && handleClick('left');
                        setSelectedDay(prevMonth());
                    }}
                />
            )}
            <div className='flex justify-center text-3xl sm:text-6xl font-sans font-extrabold select-none'>
                {selectedDay.format('MMMM')} {selectedDay.format('YYYY')}
            </div>
            {currentMonth < 36 && (
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                    className='fixed top-50 bottom-3 right-5 m-auto text-4xl cursor-pointer select-none'
                    onClick={() => {
                        currentMonth < 36 && handleClick('right');
                        setSelectedDay(nextMonth());
                    }}
                />
            )}
        </div>
    );
}
