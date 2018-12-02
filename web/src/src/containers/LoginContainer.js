import React, { Component } from 'react';
import Login from '../components/Login';

class LoginContainer extends Component{

    constructor(props){
        super(props);
    }

    render() {
        return <Login />;
    }

}



var button = {
    paddingTop: 10
}

export default LoginContainer;