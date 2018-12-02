import React, { Component } from 'react';
import Header from './Header';
import "../css/Login.css";
import Footer from './Footer';
import Main from '../Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from './colors';
import "../css/index.css";

class App extends Component {

    render() {

        return (
            <MuiThemeProvider theme={Theme}>
                <div style={{fontFamily: 'Roboto'}}>
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );

    }
}

export default App;