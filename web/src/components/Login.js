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
const emailRegex = require('email-regex');

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loader: false,
            email: '',
            password: '',
            emailforgot: '',
            requiredText1: '',
            requiredText2: '',
            requiredText3: ''
        };

        this.handleCheckForm = this.handleCheckForm.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }

    handleClickOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
        this.setState({loader: false});
    };

    handleCheckForm(){
        if (!emailRegex({exact: true}).test(this.state.emailforgot)){
            this.setState({ requiredText3: 'L\'adresse Email n\'est pas valide.'});
        }
        else{
            this.setState({ loader: true });
        }
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
        this.state.email !== '' ? this.setState({requiredText1 : ''}) : false;
        this.state.password !== '' ? this.setState({requiredText2 : ''}) : false;
        this.state.emailforgot !== '' ? this.setState({requiredText3 : ''}) : false;
        console.log(evt.target.name);
    }

    render() {
        return (
            <div className="WrapLogin">
                <div style={{margin:'5%'}}>
                <div className="text-center title">Connexion</div>
                <form>
                    <TextField
                        style={{width: '90%'}}
                        hintText="Votre identifiant"
                        floatingLabelText="Identifiant"
                        name="email"
                        errorText={this.state.requiredText1}
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br/>
                    <TextField
                        style={{width: '90%'}}
                        hintText="Votre mot de passe"
                        floatingLabelText="Mot de passe"
                        name="password"
                        type='password'
                        errorText={this.state.requiredText2}
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br/>
                    <div className="button"><RaisedButton label="Se connecter" primary={true}/></div>
                    <a onClick={this.handleClickOpen} style={{cursor:'pointer'}}>
                        <div style={{float: 'right', fontSize: '0.8' + 'em', margin: '2%'}}> Mot de passe oublié ?</div>
                    </a>
                </form>
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {textAlign:'center', margin: '10%'} : {display:'none'}}>
                        <img src={loader} style={{display: 'inherit', margin: '0 auto'}} />
                        Veulliez patienter, votre mail est en cours d'envoi...
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
                            name="emailforgot"
                            id="name"
                            label="Email Address"
                            type="email"
                            value={this.state.emailForgot}
                            fullWidth
                            errorText={this.state.requiredText3}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleCheckForm} color="primary">
                            Recevoir mon nouveau mot de passe
                        </Button>
                    </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    };
}

export default Login;