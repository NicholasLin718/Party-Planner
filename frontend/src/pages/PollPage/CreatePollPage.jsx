
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { store } from '../../store';
export default function CreatePollPage() {
    const { code } = useParams();
    const [pollName, setPollName] = useState("");
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    async function postPoll(e) {
        e.preventDefault();
        const rawBody = {
            title: pollName,
            options: options,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        const response = await fetch(
            'http://localhost:5000/pages/' + code + '/polls',
            requestOptions
        );
        console.log(response);
        navigate('/r/' + code + '/polls')
    }

    const onPollNameChange = (e) => {
        setPollName(e.target.value);
    }

    const onOptionChange = (e, i) => {
        setOptions((options) =>{
            options[i] = e.target.value;
            return options;
        });
    }

    const addOption = (e) => {
        e.preventDefault();
        console.log(options);
        setOptions(options => [...options, ""]);
    }
    return (
        <div>
            <div>hi</div>
            <form onSubmit={postPoll}>
                <label>Poll Name</label>
                <input type='text' onChange={onPollNameChange} />
                {
                    options?.map((option, i) => (
                        <input 
                            type='text' 
                            onChange={e => onOptionChange(e,i)} 
                            key={i}
                        />
                    ))
                }
                <button onClick={addOption}>+</button>
                <button type='submit'>Add Poll</button>
            </form>
        </div>
    );
}
