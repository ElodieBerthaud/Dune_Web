import { createMuiTheme } from '@material-ui/core/styles/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4',
      contrastText: 'white'
    },
    secondary: {
      main: '#ffd600'
    },
    typography: {
      useNextVariants: true
    },

  }
});

export default theme;
