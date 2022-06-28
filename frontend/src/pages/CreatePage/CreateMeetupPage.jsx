import Calendar from '../../components/Calendar/Calendar';
import TimeRange from '../../components/TimeRange/TimeRange';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
export default function CreateMeetupPage() {
    const CalendarRef = useRef();
    const TimeRangeRef = useRef();
    const navigate = useNavigate();
    //create a function such that when button outside here is pressed, it will
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function createCode() {
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        console.log(code);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ code: code })
        // };
        // console.log(JSON.stringify({ code: code }));
        // axios('http://localhost:5000/pages/create', requestOptions)
        //     .then((response) => {
        //         response.json();
        //         console.log(response);
        //     })
        //     .then((data) => console.log(data));
        postCode(code);
    }
    async function postCode(code) {
        // let payload = { code: code };
        // let headers = {
        //     'Content-Type': 'application/json'
        // };
        // try {
        //     let res = await axios.post('/pages/create', payload, headers);

        //     let data = res.data;
        //     console.log(data);
        // } catch (e) {
        //     console.log(e);
        // }

        let payload = { code: code };
        try {
            const response = await fetch('http://localhost:5000/pages/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <TimeRange ref={TimeRangeRef} />
            <Calendar ref={CalendarRef} />
            <button
                onClick={() => {
                    CalendarRef.current.storeSelectedList();
                    TimeRangeRef.current.storeRange();
                    navigate('../select');
                }}>
                submit
            </button>
            <button onClick={createCode}>Create Code</button>
        </div>
    );
}
