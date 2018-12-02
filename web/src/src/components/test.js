import React, { Component } from 'react';
import '../css/App.css';
import FullTest from './FullTest';
import { Switch, Route } from 'react-router-dom';

class Test extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/test' component={FullTest}/>
            </Switch>
        );
    }
}

export default Test;