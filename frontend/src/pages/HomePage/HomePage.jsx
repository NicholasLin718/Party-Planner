import {
    createTheme,
    ThemeProvider,
    makeStyles
} from '@material-ui/core/styles';
import NavBar from './NavBar';
import Login from './Login';
import LoginButton from './LoginButton';
import './HomePage.css';
import AnimationLady from './AnimationLady';

//creating theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#f47b8f'
        },
        secondary: {
            main: '#51aeae'
        }
    },
    typography: {
        fontFamily: ['Montserrat']
    }
});

function HomePage() {
    return (
        <div className='homepage'>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Login />
                <LoginButton />
                <div className='animationBottom'>
                    <AnimationLady />
                </div>
            </ThemeProvider>
        </div>
    );
}

export default HomePage;
