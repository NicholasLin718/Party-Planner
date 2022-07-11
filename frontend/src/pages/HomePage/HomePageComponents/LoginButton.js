// import React from 'react';
// import logo from '';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    return (
        <Toolbar className={loginStyle.textField}>
            <EnterCode />
            <button
                onClick={() => {
                    navigate('/create');
                }}>
                Create New Room
            </button>
        </Toolbar>
    );
}

export default Login;
