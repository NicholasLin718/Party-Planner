import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import NavBar from './HomePageComponents/NavBar';
import Login from './HomePageComponents/Login';
import LoginButton from './HomePageComponents/LoginButton'
import './HomePage.css';

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})

//creating theme
const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

function HomePage() {
  const classes = styles(); 
  return (
    <div className="homepage">
        <ThemeProvider theme={theme}>
          <NavBar/>
          <Login/>
          <LoginButton/>
        </ThemeProvider>
    </div>
  );
}

export default HomePage;

