import React from 'react';
// import logo from '';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    bar: {
        paddingTop: '1.15rem'
    },
    text: {
        color: '#f47b8f',
        cursor: 'pointer',
        fontFamily: 'Oswald',
        textShadow: '1px 2px #f5cdd3 ',
        fontWeight: '350',
        fontSize: '2.5em',
        paddingTop: '6rem',
        flexGrow: 1
    }
});
function Login() {
    const loginStyle = styles();
    return (
        <Toolbar position='center' className={loginStyle.bar}>
            <Typography variant='h4' className={loginStyle.text}>
                Schedule meetings for everyone without the hassle.
            </Typography>
        </Toolbar>
    );
}

export default Login;
