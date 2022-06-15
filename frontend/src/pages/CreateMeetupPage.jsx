import Calendar from "../components/Calendar/Calendar";
import TimeRange from "../components/TimeRange/TimeRange";
import { useRef } from "react";
import React from 'react'

export default function CreateMeetupPage() {
  const CalendarRef = useRef();
  const TimeRangeRef = useRef();
  //create a function such that when button outside here is pressed, it will
  return (
    <div>
        <TimeRange ref = {TimeRangeRef}/>        
        <Calendar ref={CalendarRef}/>
        <button onClick={() => {
            CalendarRef.current.storeSelectedList();
            TimeRangeRef.current.storeRange();
          }}>submit</button>
    </div>
  )
}
