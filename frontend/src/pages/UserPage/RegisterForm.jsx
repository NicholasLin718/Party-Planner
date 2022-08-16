import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faPersonWalkingArrowRight
} from '@fortawesome/free-solid-svg-icons';
import DropDownMenu from './DropDownMenu';
import { useEffect } from 'react';

const RegisterForm = (props) => {
    const { setUserStorage, allUsers } = props;
    const navigate = useNavigate();
    const { code } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('None');
    const [exampleQuestion, setExampleQuestion] = useState('');
    const exampleQuestions = [
        'What was the name of your first stuffed animal?',
        'In what city or town did your mother and father meet?',
        'What was the first exam you failed?',
        'What was your favorite food as a child?',
        'What was the name of your elementary school?',
        "What is your mother's maiden name?",
        'What is the name of your first pet?',
        'In what city were you born?',
        'What was your childhood nickname?'
    ];
    useEffect(() => {
        setExampleQuestion(
            exampleQuestions[
                Math.ceil(Math.random() * exampleQuestions.length - 1)
            ]
        );
    }, []);
    const onUsernameChange = (e) => {
        let result = '';
        for (let i = 0; i < e.target.value.length; i++) {
            if (
                !(
                    e.target.value.charCodeAt(i) < 65 ||
                    (e.target.value.charCodeAt(i) > 90 &&
                        e.target.value.charCodeAt(i) < 97) ||
                    e.target.value.charCodeAt(i) > 122
                )
            ) {
                result += e.target.value.charAt(i);
            }
        }
        e.target.value = result;
        setUsername(result);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onSecurityQuestionChange = (e) => {
        setSecurityQuestion(e.target.value);
    };
    const onSecurityQuestionAnswerChange = (e) => {
        setSecurityQuestionAnswer(e.target.value);
    };

    const validateFields = () => {
        if (!username) return false;
        else if (selectedOption === 'Password' && !password) return false;
        else if (
            selectedOption === 'Security Question' &&
            (!securityQuestion || !securityQuestionAnswer)
        )
            return false;
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) alert('Fields cannot be blank!');
        else {
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].username === username) {
                    alert('Username already exists!');
                    return;
                }
            }
            console.log('hi');
            const sprite = Math.ceil(Math.random() * 12 - 1);
            let storedPassword;
            let storedSecurityQuestion = '';
            if (selectedOption == 'Password') {
                storedPassword = password;
            } else if (selectedOption == 'Security Question') {
                storedPassword = securityQuestionAnswer;
                storedSecurityQuestion = securityQuestion;
            } else {
                storedPassword = '';
            }
            const rawBody = {
                $push: {
                    users: {
                        username: username,
                        password: password,
                        sprite: sprite,
                        availableTimes: new Array(48).fill(false)
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
        }
    };
    return (
        <div className='flex justify-center mb-4 bg-blue-100 border-2 rounded-md shadow-md w-[600px] h-auto px-4 py-4'>
            <form onSubmit={handleSubmit}>
                <DropDownMenu
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
                <div>
                    <label>Username</label>
                    <input
                        type='text'
                        onChange={onUsernameChange}
                        className='w-[100%] px-3 py-3'
                        maxLength={50}
                    />
                    {selectedOption === 'Password' && (
                        <div>
                            <label>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={onPasswordChange}
                                value={password}
                                className='w-[100%] px-3 py-3'
                            />
                            <FontAwesomeIcon
                                className='ml-[-36px] text-slate-600 text-xl'
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            />
                        </div>
                    )}
                    {selectedOption === 'Security Question' && (
                        <div>
                            <label>Security Question</label>
                            <input
                                type='text'
                                onChange={onSecurityQuestionChange}
                                placeholder={exampleQuestion}
                                className='w-[100%] px-3 py-3'
                            />
                            <label>Answer</label>
                            <input
                                type='text'
                                onChange={onSecurityQuestionAnswerChange}
                                className='w-[100%] px-3 py-3'
                            />
                        </div>
                    )}
                    <div className='mt-4'>
                        <button
                            type='submit'
                            className='group w-auto px-2 py-2 rounded bg-rose-100 border-2 border-rose-200 hover:bg-rose-300 ease-in duration-150'>
                            Join Event
                            <FontAwesomeIcon
                                icon={faPersonWalkingArrowRight}
                                className='ml-2 group-hover:ml-5 ease-in duration-300'
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
