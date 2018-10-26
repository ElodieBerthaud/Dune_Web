import {createMuiTheme} from "@material-ui/core/styles/index";

export default createMuiTheme({
    palette: {
        primary: {
            main: '#00BCD4',
            contrastText: 'white'
        },
        secondary:{
            main: '#ffd600'
        },
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    }
});