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
        flexGrow: 1,
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    },
    loginField: {
        color: "#f47b8f",
        background: "1px solid #f47b8f",
        borderRadius: "50px"
    }
})

function Login() {
    const classes = styles()

    return (
        <Toolbar className={classes.bar}>   
        <TextField position="center" className={classes.loginField}
            variant="outlined"
            id = "outlined"
            defaultValue={""}
            label= "Username"
            InputProps={{
                className: classes.text,  
            }}
            style={{
                backgroundColor: "blue"
            }}
        />
        
        </Toolbar>


    );
}

export default Login;

