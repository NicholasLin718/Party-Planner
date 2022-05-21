import React from 'react'


export default function Header({selectedDay, setSelectedDay, currentMonth, setCurrentMonth}) {
    function prevMonth(){
        return selectedDay.clone().subtract(1, "month");
    }

    function nextMonth(){
        return selectedDay.clone().add(1, "month");
    }
    
    function currMonth(){
        return selectedDay.isSame(new Date(), "month");
    }

    const handleClick = (way) =>{
        way === "left" ? setCurrentMonth(currentMonth > 0 ? currentMonth-1:0) :
        setCurrentMonth(currentMonth<12? currentMonth + 1 : 12)
    }

  return (
    <div className="header">
        <div className= "prev" onClick={() => {currentMonth !== 0 && handleClick("left"); setSelectedDay(prevMonth())}}>{!currMonth() ? String.fromCharCode(171) : null}</div>
        <div>{selectedDay.format("MMMM")} {selectedDay.format("YYYY")}</div>
        <div className= "next" onClick={() => {currentMonth < 12 && handleClick("right"); setSelectedDay(nextMonth())}}>{currentMonth < 12 ? String.fromCharCode(187) : null}</div>
    </div>
  )
}
