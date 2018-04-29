import React, { Component } from 'react';
import '../css/App.css';
import Home from './Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';
import Header from './Header';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div>
              <Header/>
          </div>
        <div>
            <Home/>
        </div>
        <div>
            <Footer/>
        </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
