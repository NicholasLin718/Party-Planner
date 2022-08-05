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
    async function createCode() {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        await retrieveReduxData(code);
    }
    async function retrieveReduxData(code) {
        const data = store.getState();
        console.log(data);
        const rawBody = {
            code: code,
            meetupName: data.timeRange.title,
            meetupDescription: data.timeRange.description,
            meetupLocation: null,
            meetupDays: JSON.stringify(data.selectedDays),
            meetupTimeRange: JSON.stringify(data.timeRange.range)
        };
        console.log(rawBody);
        await postData(rawBody);
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
        <div className='bg-[#faf0ef] pb-20'>
            <TimeRange ref={TimeRangeRef} />
            <Calendar ref={CalendarRef} />
            <div className='text-center'>
                <button
                    onClick={async () => {
                        //ADD CONDITIONS FOR REQUIRED FIELDS
                        TimeRangeRef.current.storeRange();
                        CalendarRef.current.storeSelectedList();
                        const data = store.getState();
                        if (!data.timeRange.title)
                            alert('Event name required!');
                        else if (data.selectedDays.length === 0)
                            alert('Select at least one day!');
                        else {
                            await createCode();
                            if (localStorage.getItem(code)) {
                                navigate('/users/' + code);
                                window.location.reload(); //CLEARS THE STATES
                            } else {
                                alert('Error occured while creating the room!');
                                navigate('/create');
                            }
                        }
                    }}
                    className='w-[500px] mt-[550px] px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'>
                    Create Event
                </button>
            </div>
            {/* <button onClick={createCode}>Create Code</button> */}
        </div>
    );
}
