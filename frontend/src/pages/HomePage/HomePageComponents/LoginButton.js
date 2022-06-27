// import React from 'react';
// import logo from '';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import EnterCode from '../../../components/LoginRouting/EnterCode';
import CreateMeetupPage from '../../CreatePage/CreateMeetupPage';
import './LoginButton.css';

const styles = makeStyles({
    textField: {
        justifyContent: 'center'
    }
});

function Login() {
    const loginStyle = styles();
    const [title, setTitle] = useState('');
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayNewLogin, setDisplayNewLogin] = useState(false);

    return (
        <Toolbar className={loginStyle.textField}>
            {!displayLogin && !displayNewLogin && (
                <button onClick={() => setDisplayNewLogin(true)}>
                    Create New Room
                </button>
            )}
            {!displayLogin && !displayNewLogin && (
                <button onClick={() => setDisplayLogin(true)}>
                    Enter Existing Room Code
                </button>
            )}
            {displayLogin && !displayNewLogin && <EnterCode />}
            {!displayLogin && displayNewLogin && <CreateMeetupPage />}
            {/* <form className='loginStyle'>
                <input
                    className='loginButton'
                    type='textarea'
                    placeholder='Enter Username'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}></input>
                <input type='submit' className='loginSubmit'></input>
            </form> */}
        </Toolbar>
    );
}

export default Login;
