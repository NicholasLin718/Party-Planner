import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

const NewPoll = () => {
    const { code } = useParams();
    const [pollName, setPollName] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    async function postPoll(e) {
        e.preventDefault();
        const rawBody = {
            title: pollName,
            options: options
        };
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
        navigate('/r/' + code + '/polls');
    }

    const onPollNameChange = (e) => {
        setPollName(e.target.value);
    };

    const onOptionChange = (e, i) => {
        setOptions((options) => {
            options[i] = e.target.value;
            return options;
        });
    };

    const addOption = (e) => {
        e.preventDefault();
        console.log(options);
        setOptions((options) => [...options, '']);
    };

    return (
        <div className='flex justify-center mb-4 bg-blue-100 border-2 rounded-md shadow-md w-[600px] h-auto px-4 py-4'>
            <form onSubmit={postPoll}>
                <label>Poll Name</label>
                <input
                    type='text'
                    onChange={onPollNameChange}
                    className='w-[100%] px-3 py-3'
                />
                {options?.map((option, i) => (
                    <input
                        type='text'
                        onChange={(e) => onOptionChange(e, i)}
                        key={i}
                    />
                ))}
                <button className='p-2 bg-red-200' onClick={addOption}>
                    +
                </button>
                <button
                    type='submit'
                    className='group w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'>
                    Add Poll
                    <FontAwesomeIcon
                        icon={faPersonWalkingArrowRight}
                        className='ml-2 group-hover:ml-5 ease-in duration-300'
                    />
                </button>
            </form>
        </div>
    );
};

export default NewPoll;
