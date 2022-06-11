// import React from 'react';
// import logo from '';
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 
import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    text: {
        color: "#f47b8f",
        cursor: "pointer", 
        fontFamily: "Dosis",
        paddingTop: "10rem",
        flexGrow: 1,
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    },
    loginField: {
        borderSide: "1px solid #f47b8f",
        borderRadius: "50px"
    }
})
function Login() {
    const classes = styles()

    return (
        <Toolbar position="center" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
        <TextField className={classes.loginField}
            variant="outlined"
            id = "outlined"
            value=""
            label= "Username"
        />
        
        </Toolbar>


    );
}

export default Login;

