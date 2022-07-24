import React from 'react';
import logo from './logotemp.png';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    bar: {
        paddingTop: '0.2rem',
        ['@media (max-width:200px)']: {
            flexDirection: 'column'
        }
    },
    logo: {
        width: '20vh',
        ['@media (max-width:200px)']: {
            display: 'none'
        }
    },
    menuItem: {
        color: '#51aeae',
        cursor: 'pointer',
        fontFamily: 'Dosis',
        fontWeight: '',
        flexGrow: 1,
        '&:hover': {
            color: '#a1dcd8'
        }
    }
});
function NavBar() {
    const classes = styles();
    return (
        <Toolbar
            position='sticky'
            color='rgba(0, 0, 0, 0.87)'
            className={classes.bar}>
            <img src={logo} className={classes.logo} />
        </Toolbar>
    );
}

export default NavBar;
