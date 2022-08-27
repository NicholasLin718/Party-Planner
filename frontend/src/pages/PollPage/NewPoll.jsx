import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import e from 'cors';

const NewPoll = () => {
    const { code } = useParams();
    const [pollName, setPollName] = useState('');
    const [options, setOptions] = useState(['', '']);
    const navigate = useNavigate();

    async function postPoll(e) {
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

    const deleteOption = (e, i) => {
        console.log(i);
        e.preventDefault();
        options.splice(i,1);
        setOptions([...options]);
    }

    const addOption = (e) => {
        e.preventDefault();
        console.log(options);
        setOptions((options) => [...options, '']);
    };

    return (
        <div className='flex justify-center mb-4 bg-blue-100 border-2 rounded-md shadow-md w-[600px] h-auto px-4 py-4'>
            <form
                className='flex flex-col w-[100%] sm:w-[500px]'
                onSubmit={postPoll}>
                <div>
                    <label>Poll Name</label>
                </div>
                <input
                    className='w-[100%] px-3 py-3 rounded placeholder:italic placeholder:text-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    type='text'
                    onChange={onPollNameChange}
                    placeholder='Type your question here...'
                />
                <div className='pt-4'>
                    <label>Answer Options</label>
                </div>
                {options?.map((option, i) => (
                    <div className='pb-1' key={i}>
                        <input
                            className='w-[100%] px-3 py-3 rounded placeholder:italic placeholder:text-slate-400 focus:ring-sky-500 focus:border-sky-500'
                            type='text'
                            onChange={(e) => onOptionChange(e, i)}
                            placeholder={'Option ' + (i + 1)}
                        />
                        <button onClick = {(e) => deleteOption(e, i)}>
                            trash
                        </button>
                    </div>
                ))}
                <button className='flex text-rose-500' onClick={addOption}>
                    + Add Option
                </button>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className='group w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'>
                        Submit
                        <FontAwesomeIcon
                            icon={faPersonWalkingArrowRight}
                            className='ml-2 group-hover:ml-5 ease-in duration-300'
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPoll;
