import Calendar from '../../components/Calendar/Calendar';
import TimeRange from '../../components/TimeRange/TimeRange';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { store } from '../../store';
export default function CreateMeetupPage() {
    const CalendarRef = useRef();
    const TimeRangeRef = useRef();
    const navigate = useNavigate();
    let code = '';
    //create a function such that when button outside here is pressed, it will
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function createCode() {
        for (let i = 0; i < 6; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        retrieveReduxData(code);
    }
    function retrieveReduxData(code) {
        const data = store.getState();
        const rawBody = {
            code: code,
            meetupName: data.timeRange.title,
            meetupDescription: data.timeRange.description,
            users: ['Nicholas'],
            meetupLocation: null,
            meetupDays: JSON.stringify(data.selectedDays),
            meetupTimeRange: JSON.stringify(data.timeRange.range)
        };
        console.log(rawBody);
        postData(rawBody);
        localStorage.setItem(code, 'true');
    }
    async function postData(rawBody) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        const response = await fetch(
            'http://localhost:5000/pages/create',
            requestOptions
        );
        console.log(response);
    }

    return (
        <div>
            <TimeRange ref={TimeRangeRef} />
            <Calendar ref={CalendarRef} />
            <button
                onClick={() => {
                    //ADD CONDITIONS FOR REQUIRED FIELDS
                    CalendarRef.current.storeSelectedList();
                    TimeRangeRef.current.storeRange();

                    createCode();
                    if (localStorage.getItem(code)) {
                        console.log('ij');
                        navigate('/users/' + code);
                    } else {
                        alert('Error occured while creating the room!');
                        navigate('/create');
                    }
                }}>
                submit
            </button>
            {/* <button onClick={createCode}>Create Code</button> */}
        </div>
    );
}
