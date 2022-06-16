import Calendar from "../components/Calendar/Calendar";
import TimeRange from "../components/TimeRange/TimeRange";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function CreateMeetupPage() {
  const CalendarRef = useRef();
  const TimeRangeRef = useRef();
  const navigate = useNavigate();
  //create a function such that when button outside here is pressed, it will
  return (
    <div>
        <TimeRange ref = {TimeRangeRef}/>        
        <Calendar ref={CalendarRef}/>
        <button onClick={() => {
            CalendarRef.current.storeSelectedList();
            TimeRangeRef.current.storeRange();
            navigate('../select');
          }}>submit</button>
    </div>
  )
}
