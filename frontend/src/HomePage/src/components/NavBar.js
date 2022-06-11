import React from 'react';
import logo from '../logotemp.png';
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 

const styles = makeStyles({
    bar:{
        paddingTop: "0.2rem",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "8%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    menuItem: {
        color: "#51aeae",
        cursor: "pointer", 
        fontFamily: "Dosis",
        fontWeight: "",
        flexGrow: 1,
        "&:hover": {
            color:  "#a1dcd8",
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})
function NavBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
            <img src={logo} className={classes.logo}/> 
            <Typography variant="h6" className={classes.menuItem}>
                About
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Blog
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Terms of Use
            </Typography>
        </Toolbar>


    );
}

export default NavBar;

