import React from 'react';
import Calendar from './calendar/Calendar';
import Index from './AvailabilitySelector/Index';
import TimePeriod from './TimePeriod/TimePeriod';
import FindPage from './LandingPages/findPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PartyPage from './partyPages/partyPage';
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //    {< Route path='/' element={<FindPage/>}/>}
    //    < Route path='/select' element={<Index/>}/>
    //    {< Route path = '/:code' element = {<PartyPage/>}/>}
    //    <Route path = '/calendar' element = {<Calendar/>}/>
    //   </Routes> 
    // </BrowserRouter>
    <div>
      <Calendar/>
      <TimePeriod/>
      <Index style={{marginTop: '1000px'}}/>

    </div>
  );
}

export default App;