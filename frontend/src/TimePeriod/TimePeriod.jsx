import React, { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import TimePicker from "react-time-range";
import moment from 'moment';

export default function TimePeriod() {
    const [selectedTimezone, setSelectedTimezone] = useState({  
        "value": "America/Detroit",
        "label": "(GMT-4:00) Eastern Time (Eastern Daylight Time)",
        "offset": -4,
        "abbrev": "EDT",
        "altName": "Eastern Daylight Time"
    }); //set default to EDT
    const [startTime, setStartTime] = useState(moment().toISOString());
    const [endTime, setEndTime] = useState(moment().toISOString());

    const [startValue, setStartValue] = useState({});
    const [endValue, setEndValue] = useState({});
    //return value would be {JSON.stringify(selectedTimezone, null, 4)}
    const returnFunctionStart = (e) => {
        setStartTime(e.startTime);
        let result = startTime.match(/\d\d:\d\d/);
        setStartValue({
            "hour": (parseInt(result[0].substring(0,2)) + selectedTimezone.offset),
            "is_00": (result[0].substring(3,5) === "00")
        })
        console.log(startValue);
      };
    
    const returnFunctionEnd = (e) => {
        setEndTime(e.endTime);
        let result = endTime.match(/\d\d:\d\d/);
        setEndValue({
            "hour": (parseInt(result[0].substring(0,2)) + selectedTimezone.offset),
            "is_00": (result[0].substring(3,5) === "00")
        })
        console.log(endValue);
    };
    return (
      <div className="App">
        <blockquote>Please make a selection</blockquote>
        <div className="select-wrapper">
            <TimezoneSelect
                value={selectedTimezone}
                onChange={setSelectedTimezone}
            />
            <TimePicker
                onStartTimeChange={returnFunctionStart}
                onEndTimeChange={returnFunctionEnd}
                startMoment={startTime}
                endMoment={endTime}
            />
        </div>

      </div>
    )
}
