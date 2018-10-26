import React, { Component } from 'react';
import loader from '../images/loaders/bars-loader.gif';

class Loader extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

            <div>
                <img src={loader}/>
            </div>

        );
    }

}

export default Loader;