import React, { Component } from 'react';
import "../../css/Footer.css";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    footerStyle:{
    backgroundColor: "#00BCD4",
        fontSize: "20px",
        color: "white",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%"
    },
    phantomStyle:{
        display: "block",
        padding: "20px",
        height: "60px",
        width: "100%"
    }
}

class Footer extends Component{

    render(){
        return(
            <div>
            </div>
        );
    }

}

export default withStyles(styles)(Footer);