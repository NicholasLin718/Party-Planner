import React from 'react';
// import logo from '';
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "15%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    text: {
        color: "#f47b8f",
        cursor: "pointer", 
        fontFamily: "Oswald",
        paddingTop: "10rem",
        flexGrow: 1,
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})
function Login() {
    const classes = styles()
    return (
        <Toolbar position="center" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
            <Typography variant="h4" className={classes.text}>
                Schedule meetings for everyone without the hassle.
            </Typography>
        </Toolbar>


    );
}

export default Login;

