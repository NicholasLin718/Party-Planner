import React, { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';
import TimePicker from "react-time-range";
import moment from 'moment';

export default function TimePeriod() {
    const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment());
    //return value would be {JSON.stringify(selectedTimezone, null, 4)}
    const returnFunctionStart = (event) => {
        setStartTime(event.startTime);
      };
    
    const returnFunctionEnd = (event) => {
        setEndTime(event.endTime);
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
