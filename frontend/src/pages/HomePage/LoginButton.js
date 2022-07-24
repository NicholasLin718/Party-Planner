// import React from 'react';
// import logo from '';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterCode from '../../components/LoginRouting/EnterCode';
import CreateMeetupPage from '../CreatePage/CreateMeetupPage';
import './LoginButton.css';

const styles = makeStyles({
    textField: {
        justifyContent: 'center'
    }
});

function Login() {
    const loginStyle = styles();
    const navigate = useNavigate();
    return (
        <Toolbar className={loginStyle.textField}>
            <div className='block'>
                <EnterCode />
                <br />
                <button
                    onClick={() => {
                        navigate('/create');
                    }}
                    className='px-2 py-1 rounded bg-rose-100 border-2 border-rose-200 hover:bg-transparent ease-in duration-150'>
                    Create New Room
                </button>
            </div>
        </Toolbar>
    );
}

export default Login;
