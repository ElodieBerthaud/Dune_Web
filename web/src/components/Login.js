import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import "../css/Login.css";

class Login extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="WrapLogin">
                <div className="text-center title">Connexion</div>
                <TextField
                    style={{width:'90%'}}
                    hintText="Votre identifiant"
                    floatingLabelText="Identifiant"
                /><br />
                <TextField
                    style={{width:'90%'}}
                    hintText="Votre mot de passe"
                    floatingLabelText="Mot de passe"
                /><br />
                <div className="button"> <RaisedButton label="Se connecter" primary={true} /> </div>
            </div>
        );
    }

}

var button = {
    paddingTop: 10
}

export default Login;