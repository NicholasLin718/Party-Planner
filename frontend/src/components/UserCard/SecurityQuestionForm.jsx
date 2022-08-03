import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faPersonWalkingArrowRight
} from '@fortawesome/free-solid-svg-icons';
const PasswordForm = (props) => {
    const { setUserStorage, selectedUser, securityQuestion } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const onSecurityQuestionAnswerChange = (e) => {
        setPassword(e.target.value);
        // const result = e.target.value.replace(/\D/g, '');
        // setPassword(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawBody = {
            username: selectedUser,
            password: password
        };
        console.log("Raw Body:");
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
            alert("wrong password");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='font-mono font-bold'>
                        {securityQuestion}
                    </div>
                    <label>Answer</label>
                    <input
                        type='text'
                        onChange={onSecurityQuestionAnswerChange}
                        className='w-[100%] px-3 py-3'
                    />
                </div>
                <button
                        type='submit'
                        className='group ml-2 mt-1 w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-400 ease-in duration-150'>
                        Join Event
                        <FontAwesomeIcon
                            icon={faPersonWalkingArrowRight}
                            className='ml-2 group-hover:ml-5 ease-in duration-300'
                        />
                    </button>
            </form>
        </div>
    );
};

export default PasswordForm;
