import React, {useState, useEffect} from 'react';
import moment from 'moment';
import "./Calendar.css";

export default function Calendar() {
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment());

    const startDay = selectedDay.clone().startOf("month").startOf("week");
    const endDay = selectedDay.clone().endOf("month").endOf("week");
    
    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");
        const tempArray = [];
        while(day.isBefore(endDay, "day")){
            tempArray.push(Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone()));
        }
        setCalendar(tempArray);
    }, [selectedDay]);
    return (

        <div className="calendar">
            {calendar.map(week => 
                <div >
                    {week.map(day =>
                        <div className="day" onClick={() => setSelectedDay(day)}>
                            <div className={selectedDay.isSame(day, "day") ? "selected" : ""}>
                                {day.format("D")}
                            </div>
                        </div>)}
                </div>)}
        </div>
    )
}
