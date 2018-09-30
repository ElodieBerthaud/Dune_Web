import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import "../css/Login.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import loader from '../images/loaders/bars-loader.gif';
import check from '../images/loaders/animated-check.gif';

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loader: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({loader: false});
    };

    handleLoader = () => {
        this.setState({ loader: true });
    }


    render() {
        return (
            <div className="WrapLogin">
                <div className="text-center title">Connexion</div>
                <form>
                    <TextField
                        style={{width: '90%'}}
                        hintText="Votre identifiant"
                        floatingLabelText="Identifiant"
                    /><br/>
                    <TextField
                        style={{width: '90%'}}
                        hintText="Votre mot de passe"
                        floatingLabelText="Mot de passe"
                    /><br/>
                    <div className="button"><RaisedButton label="Se connecter" primary={true}/></div>
                    <a onClick={this.handleClickOpen} style={{cursor:'pointer'}}>
                        <div style={{float: 'right', fontSize: '0.8' + 'em'}}> Mot de passe oublié ?</div>
                    </a>
                </form>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {textAlign:'center', margin: '10%'} : {display:'none'}}>
                        <img src={loader} style={{display: 'inherit', margin: '0 auto'}} />
                        Veulliez patienter, votre mail est en cours d'envoie...
                    </div>
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                    <DialogTitle id="form-dialog-title">Mot de passe oublié</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vous avez égaré votre mot de passe. Pour en recevoir un nouveau, veuillez renseignez votre adresse Email.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleLoader} color="primary">
                            Recevoir mon nouveau mot de passe
                        </Button>
                    </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    };
}

var button = {
    paddingTop: 10
}

export default Login;