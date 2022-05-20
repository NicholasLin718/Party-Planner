import React, {useState, useEffect} from 'react';
import moment from 'moment';
import buildCalendar from './buildCalendar';
import Day from './Day';
import "./Calendar.css";
import Header from './Header';

export default function Calendar() {
    //React States
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment());

    //This allows us to build the calendar only when we change the selected day, and prevents re-renders
    useEffect(() => {
        setCalendar(buildCalendar(selectedDay));
    }, [selectedDay]);

        function prevMonth(){
        return selectedDay.clone().subtract(1, "month");
    }

    function nextMonth(){
        return selectedDay.clone().add(1, "month");
    }
    
    function currMonth(){
        return selectedDay.isSame(new Date(), "month");
    }

    const list = [];
    return (
        <div className="calendar">
            {/* <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay}/> */}

            <div className="header">
                <div className= "prev" onClick={() => !currMonth() && setSelectedDay(prevMonth())}>{!currMonth() ? String.fromCharCode(171) : null}</div>
                <div>{selectedDay.format("MMMM")} {selectedDay.format("YYYY")}</div>
                <div className= "next" onClick={() => setSelectedDay(nextMonth())}>{String.fromCharCode(187)}</div>
            </div>

            <div className="day-names">
                {
                    ["S", "M", "T", "W", "T", "F", "S"].map((dayOfWeek, i) => 
                        (
                            <div className="week" key={i}>{dayOfWeek}</div>
                        )
                    )
                }
            </div>
            {/* create div for each day */}
            <div className="body">
                {calendar.map((month, i) =>
                    <div key={i}>
                        <br></br>
                        {month.map((week, j) => 
                        <div key={j}>
                            {week.map((day, k) => 
                            <div className="day" key={k} onClick={() => {setSelectedDay(day)}}>
                                <Day day={day} key={k} selectedDay={selectedDay}/>
                            </div>)}
                        </div>)}
                    </div>
                )}
                
            </div>
        </div>
    )
}
