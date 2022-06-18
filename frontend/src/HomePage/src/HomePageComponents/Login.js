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
        flexGrow: 1,
        ['@media (max-width:780px)']: {
            paddingBottom: '1rem'
        }
    }
});
function Login() {
    const classes = styles();
    return (
        <Toolbar position='center' className={classes.bar}>
            <Typography variant='h4' className={classes.text}>
                Schedule meetings for everyone without the hassle.
            </Typography>
        </Toolbar>
    );
}

export default Login;
