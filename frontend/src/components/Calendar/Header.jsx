import React from 'react';

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
            <div
                className='fixed top-0 bottom-0 left-0 m-auto text-5xl cursor-pointer select-none'
                onClick={() => {
                    currentMonth !== 0 && handleClick('left');
                    setSelectedDay(prevMonth());
                }}>
                {!currMonth() ? String.fromCharCode(171) : null}
            </div>
            <div className='flex justify-center text-6xl font-sans font-extrabold'>
                {selectedDay.format('MMMM')} {selectedDay.format('YYYY')}
            </div>
            <div
                className='fixed top-0 bottom-0 right-0 m-auto text-5xl cursor-pointer select-none'
                onClick={() => {
                    currentMonth < 36 && handleClick('right');
                    setSelectedDay(nextMonth());
                }}>
                {currentMonth < 36 ? String.fromCharCode(187) : null}
            </div>
        </div>
    );
}
