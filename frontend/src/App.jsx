import React from 'react';
import Calendar from './calendar/Calendar';
// import DragSelector from './DragSelector/DragSelector';
// import TimeSelector from './TimeSelector/TimeSelector';
import TimeSlot from './timetable/timeSlot';
import Timetable from './timetable/timetable';
import SelectAvailability from './SelectAvailability/SelectAvailability'
function App() {
  return (
    <div>
        <h1>app</h1>
        {/* <Calendar/> */}
        {/* <TimeSelector/> */}
        {/*<DragSelector/>*/}
        <SelectAvailability/>
    </div>
  );
}

export default App;