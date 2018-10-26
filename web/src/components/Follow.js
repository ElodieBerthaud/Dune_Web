import React, { Component } from 'react';
import "../css/Login.css";
import Loader from './Loader';

class Follow extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            < Loader/>
        );
    }

}

export default Follow;