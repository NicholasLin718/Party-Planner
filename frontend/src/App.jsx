import React from 'react';
import Calendar from './components/Calendar/Calendar';
import TimeRange from './components/TimeRange/TimeRange';
import FindPage from './components/LandingPages/findPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PartyPage from './components/partyPages/partyPage';
import HomePage from './pages/HomePage/HomePage';
import CreateMeetupPage from './pages/CreatePage/CreateMeetupPage';
import EnterCode from './components/LoginRouting/EnterCode';
import Poll from './components/Polls/Poll';
import PollPage from './pages/PollPage/PollPage';
import CreatePollPage from './pages/PollPage/CreatePollPage';
// import Dashboard from './components/Dashboard/Dashboard';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoutes from './components/LoginRouting/ProtectedRoutes';
import UserPage from './pages/UserPage/UserPage';
import PageNotFound from './pages/ErrorPages/PageNotFound';
import './style.css';
import AvailableTimes from './pages/AvailableTimes/AvailableTimes';
import TaskPage from './pages/TaskPage/TaskPage';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/create' element={<CreateMeetupPage />} />
                <Route path='/range' element={<TimeRange />} />
                {/* <Route path='/r/:code' element={<Dashboard />} /> */}
                <Route path='/users/:code' element={<UserPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/r/:code' element={<Dashboard />} />
                    <Route
                        path='/r/:code/select'
                        element={<AvailableTimes />}
                    />
                    <Route path='/r/:code/polls' element={<PollPage />} />
                    <Route
                        path='/r/:code/polls/create'
                        element={<CreatePollPage />}
                    />
                    <Route path='/r/:code/tasks' element={<TaskPage />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
                <Route path='/r/404' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
