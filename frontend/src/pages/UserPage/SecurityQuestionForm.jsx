import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const PasswordForm = (props) => {
    const { setUserStorage, selectedUser } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [answer, setAnswer] = useState('');

    const onSecurityQuestionAnswerChange = (e) => {
        setAnswer(e.target.result);
        // const result = e.target.value.replace(/\D/g, '');
        // setPassword(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const rawBody = {
        //     username: selectedUser,
        //     password: password
        // };
        // console.log(rawBody);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(rawBody)
        // };

        // console.log(requestOptions.body);
        // const response = await fetch(
        //     'http://localhost:5000/pages/' + code + '/signin',
        //     requestOptions
        // );
        // const res = await response.json();
        // console.log(res);
        // if (res.message == 'SUCCESS') {
        //     setUserStorage(selectedUser);
        // } else {
        //     console.log('wrong password');
        // }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='font-mono font-bold'>
                        In what city or town did your mother and father meet?
                    </div>
                    <label>Answer</label>
                    <input
                        type='text'
                        onChange={onSecurityQuestionAnswerChange}
                        className='w-[100%] px-3 py-3'
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default PasswordForm;
