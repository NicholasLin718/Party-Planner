import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faPersonWalkingArrowRight
} from '@fortawesome/free-solid-svg-icons';
const PasswordForm = (props) => {
    const { setUserStorage, selectedUser } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const onPasswordChange = (e) => {
        setPassword(e.target.result);
        // const result = e.target.value.replace(/\D/g, '');
        // setPassword(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawBody = {
            username: selectedUser,
            password: password
        };
        console.log(rawBody);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rawBody)
        };

        console.log(requestOptions.body);
        const response = await fetch(
            'http://localhost:5000/pages/' + code + '/signin',
            requestOptions
        );
        const res = await response.json();
        console.log(res);
        if (res.message == 'SUCCESS') {
            setUserStorage(selectedUser);
        } else {
            console.log('wrong password');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex'>
                <div>
                    <label>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={onPasswordChange}
                        value={password}
                        className='w-[100%] px-1 py-1'
                    />
                    <FontAwesomeIcon
                        className='ml-[-36px] text-slate-600 text-xl'
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <button
                        type='submit'
                        className='group ml-2 mt-1 w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-400 ease-in duration-150'>
                        Join Event
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

export default PasswordForm;
