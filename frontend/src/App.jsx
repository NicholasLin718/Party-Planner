import React from 'react';
import Calendar from './components/Calendar/Calendar';
import Selector from './components/AvailabilitySelector/Selector';
import TimeRange from './components/TimeRange/TimeRange';
import FindPage from './components/LandingPages/findPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PartyPage from './components/partyPages/partyPage';
import HomePage from './HomePage/src/HomePage';
import CreateMeetupPage from './pages/CreateMeetupPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/findpage' element={<FindPage/>}/>
       <Route path = '/:code' element = {<PartyPage/>}/>
       <Route path = '/create' element = {<CreateMeetupPage/>}/>
       <Route path = '/range' element = {<TimeRange/>}/>
       <Route path = '/select' element = {<Selector/>}/>
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