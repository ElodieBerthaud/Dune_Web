import React, { Component } from 'react';
import Test from './test.js';

class Follow extends Component{

    render(){
        return(
            <div>
                <Test mode={"tableau"} url={"http://176.31.252.134:7001/files/eleves/test2.pdf"}/>
            </div>
        );
    }

}

export default Follow;