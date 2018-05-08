import React, { Component } from 'react';
import Header from './Header';
import "../css/Login.css";
import Footer from './Footer';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
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