import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Header from '../components/Main/Header';
import '../styles/Login.css';
import Footer from '../components/Main/Footer';
import Main from '../components/Main/Main';
import Theme from '../components/Main/colors';
import '../styles/index.css';
import SnackBars from '../components/Main/SnackBars';
import 'typeface-roboto';

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <div>
      <Header />
      <SnackBars />
      <Main />
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
