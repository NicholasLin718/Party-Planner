import React from 'react';
import Calendar from './calendar/Calendar';
import Index from './AvailabilitySelector/Index';
import TimeRange from './TimeRange/TimeRange';
import FindPage from './LandingPages/findPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PartyPage from './partyPages/partyPage';
import HomePage from './HomePage/src/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/findpage' element={<FindPage/>}/>
       <Route path='/select' element={<Index/>}/>
       <Route path = '/:code' element = {<PartyPage/>}/>
       <Route path = '/calendar' element = {<Calendar/>}/>
       <Route path = '/range' element = {<TimePeriod/>}/>
       <Route path = '/index' element = {<Index/>}/>
      </Routes> 
    </BrowserRouter>
    // <div>
    //   <Calendar/>
    //   <TimePeriod/>
    //   <Index style={{marginTop: '1000px'}}/>

    // </div>
  );
}

export default App;