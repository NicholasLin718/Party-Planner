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
    const [currentMonth,setCurrentMonth] = useState(0);
    const [selectedList, setSelectedList] = useState([]);
    //This allows us to build the calendar only when we change the selected day, and prevents re-renders
    useEffect(() => {
        setCalendar(buildCalendar(selectedDay));
    }, []);
    
    return (
        <div class="calendar">
            <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
            <div class="day-names">
                {
                    ["S", "M", "T", "W", "T", "F", "S"].map((dayOfWeek, i) => 
                        (
                            <div class="dayOfWeek" key={i}>{dayOfWeek}</div>
                        )
                    )
                }
            </div>
            {/* create div for each day */}
            <div class="body">
                {calendar.map((month, i) =>
                    <div class="slider" key={i} style={{transform: `translateX(-${currentMonth*100}vw)`}}>
                        <br></br>
                        <div class="container">
                            {month.map((week, j) => 
                            <div class="week" key={j}>
                                {week.map((day, k) => 
                                    <Day key={k} day={day} selectedDay={selectedDay} selectedList={selectedList} setSelectedList={setSelectedList} currentMonth={currentMonth}/>
                                    )}
                            </div>)}
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    )
}

