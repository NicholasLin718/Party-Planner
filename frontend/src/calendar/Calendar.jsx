import React, {useState, useEffect} from 'react';
import moment from 'moment';
import buildCalendar from './buildCalendar';
import Day from './Day';
import "./Calendar.css";
import Header from './Header';
import {useDispatch, useSelector} from "react-redux";
import {storeList, selectAllDays} from "../features/CalendarSlice";
import Index from "../AvailabilitySelector/Index";
export default function Calendar() {
    const printList = useSelector(selectAllDays);
    const dispatch = useDispatch();
    //React States
    const [calendar, setCalendar] = useState([]);
    const [selectedDay, setSelectedDay] = useState(moment());
    const [currentMonth,setCurrentMonth] = useState(0);
    const [selectedList, setSelectedList] = useState([]);
    //This allows us to build the calendar only when we change the selected day, and prevents re-renders
    useEffect(() => {
        setCalendar(buildCalendar(selectedDay));
    }, []);
    
    const handleCock = () => {
        if(selectedList.length > 0){
            console.log("ran");
            console.log(selectedList);
            dispatch(storeList(selectedList));
        }
    }
    return (
        <div>
            
            <div className="calendar">
                <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
                <div className="day-names">
                    {
                        ["S", "M", "T", "W", "T", "F", "S"].map((dayOfWeek, i) => 
                            (
                                <div className="dayOfWeek" key={i}>{dayOfWeek}</div>
                            )
                        )
                    }
                </div>
                {/* create div for each day */}
                <div className="body">
                    {calendar.map((month, i) =>
                        <div className="slider" key={i} style={{transform: `translateX(-${currentMonth*100}vw)`}}>
                            <br></br>
                            <div className="container">
                                {month.map((week, j) => 
                                <div className="week" key={j}>
                                    {week.map((day, k) => 
                                        <Day key={k} day={day} selectedDay={selectedDay} selectedList={selectedList} setSelectedList={setSelectedList} currentMonth={currentMonth}/>
                                        )}
                                </div>)}
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
            <button onClick={handleCock} style={{marginTop: '1000px'}}>click for cock</button>
        </div>
    )
}