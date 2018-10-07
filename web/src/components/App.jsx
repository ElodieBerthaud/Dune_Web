import React, { Component } from 'react';
import Header from './Header';
import "../css/Login.css";
import Footer from './Footer';
import Main from '../Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from './colors';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <div>
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );

    }
}

export default App;