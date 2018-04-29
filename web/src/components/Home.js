import React, { Component } from 'react';
import Login from './Login';
import "../css/Login.css"

class Home extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="login">
                <Login/>
            </div>
        );
    }

}

export default Home;