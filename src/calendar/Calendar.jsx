import React, {useState, useEffect} from 'react';
import moment from 'moment';
import buildCalendar from './buildCalendar';
import dayStyles from './styleCalendar';

import "./Calendar.css";
import Header from './Header';

export default function Calendar() {
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment());

    useEffect(() => {
        setCalendar(buildCalendar(selectedDay));
    }, [selectedDay]);

    return (
        <div className="calendar">
            <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <div className="day-names">
                {
                    ["S", "M", "T", "W", "T", "F", "S"].map((dayOfWeek) => 
                        (
                            <div className="week">{dayOfWeek}</div>
                        )
                    )
                }
            </div>
            <div className="body">
                {calendar.map(week => 
                    <div >
                        {week.map(day =>
                            <div className="day" onClick={() => 
                                {
                                    setSelectedDay(day)
                                }}>
                                <div className={dayStyles(day, selectedDay)}>
                                    {day.format("D")}
                                </div>
                            </div>)}
                    </div>)}
            </div>
        </div>
    )
}
