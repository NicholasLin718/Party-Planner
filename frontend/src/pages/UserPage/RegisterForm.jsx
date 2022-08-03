import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faPersonWalkingArrowRight
} from '@fortawesome/free-solid-svg-icons';

const RegisterForm = (props) => {
    const { setUserStorage } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onPasswordChange = (e) => {
        // const result = e.target.value.replace(/\D/g, '');
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sprite = Math.ceil(Math.random() * 12 - 1);
        const rawBody = {
            $push: {
                users: {
                    username: username,
                    password: password,
                    sprite: sprite,
                    availableTimes: new Array(24).fill(false)
                }
            }
        };
        //most likely need to fetch full thing and then update users
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };
        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code,
            requestOptions
        );
        console.log(response);
        setUserStorage(username);
    };
    return (
        <div className='mb-4'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type='text' onChange={onUsernameChange} />
                    <label>Password (Optional)</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={onPasswordChange}
                        value={password}
                    />
                    <FontAwesomeIcon
                        className='ml-[-24px] text-slate-600'
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    />
                    <button
                        type='submit'
                        className='group block w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'>
                        Join Event
                        <FontAwesomeIcon
                            icon={faPersonWalkingArrowRight}
                            className='ml-2 group-hover:ml-4 ease-in duration-300'
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
