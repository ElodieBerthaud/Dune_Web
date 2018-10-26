import React, { Component } from 'react';
import Header from './Header';
import "../css/Login.css";
import Footer from './Footer';
import Main from '../Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from './colors';
import "../css/index.css";
import {connect} from "react-redux";

class App extends Component {

    constructor(props) {
        super(props);
    }

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