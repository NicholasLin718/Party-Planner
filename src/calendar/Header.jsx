import React from 'react'


export default function Header({selectedDay, setSelectedDay}) {
    function prevMonth(){
        return selectedDay.clone().subtract(1, "month");
    }

    function nextMonth(){
        return selectedDay.clone().add(1, "month");
    }
    
    function currMonth(){
        return selectedDay.isSame(new Date(), "month");
    }

  return (
    <div className="header">
        <div className= "prev" onClick={() => !currMonth() && setSelectedDay(prevMonth())}>{!currMonth() ? String.fromCharCode(171) : null}</div>
        <div>{selectedDay.format("MMMM")} {selectedDay.format("YYYY")}</div>
        <div className= "next" onClick={() => setSelectedDay(nextMonth())}>{String.fromCharCode(187)}</div>
    </div>
  )
}
