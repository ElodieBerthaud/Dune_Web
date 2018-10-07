import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "../css/Login.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            emptyemail: false,
            emptypassword: false,
            emptyforgotemail: true,
            mandatory: 'Ce champs est obligatoire.'
        };

        this.handleCheckFormForgot = this.handleCheckFormForgot.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeForgot = this.handleChangeForgot.bind(this);
        this.handleCheckFormConnect = this.handleCheckFormConnect.bind(this);
        this.checkEmailForgot = this.checkEmailForgot.bind(this);

    }

    handleClickOpen(){
        this.setState({ open: true });
    };

    handleClose(){
        this.setState({ open: false });
        this.setState({loader: false});
    };

    handleCheckFormForgot(){
        if (!emailRegex({exact: true}).test(this.state.emailforgot)){
            this.setState({emptyforgotemail : true});
        }
        else{
            this.setState({ loader: true });
        }
    }

    handleCheckFormConnect(){
        if (this.state.email === '' || this.state.password === '') {
            this.state.email === '' ? this.setState({emptyemail : true}) : this.setState({emptyemail : false});
            this.state.password === '' ? this.setState({emptypassword : true}) : this.setState({emptypassword : false});
        }
    }

    handleChangeLogin(evt){
        this.setState({[evt.target.name]: evt.target.value});
        this.state.email !== '' ? this.setState({emptyemail : false}) : this.setState({emptyemail : true});
        this.state.password !== '' ? this.setState({emptypassword : false}) : this.setState({emptypassword : true});
        console.log(evt.target.name);
    }

    handleChangeForgot(evt){
        this.setState({[evt.target.name]: evt.target.value});
        !emailRegex({exact: true}).test(this.state.emailforgot) ? this.setState({emptyforgotemail : true}) : this.setState({emptyforgotemail : false});
        console.log(this.state.emptyforgotemail);
    }

    checkEmailForgot(){
        console.log("coiucoucocuc");
        return (emailRegex({exact: true}).test(this.state.emailforgot));
    }

    render() {
        return (
            <div className="WrapLogin">
                <div style={{margin:'5%'}}>
                <div className="text-center title">Connexion</div>
                <form>
                    <TextField
                        style={{width: '90%'}}
                        label="Votre identifiant"
                        placeholder="Identifiant"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChangeLogin}
                        error={this.state.emptyemail}
                        helperText={this.state.emptyemail ? this.state.mandatory : ''}
                    /><br/>
                    <TextField
                        style={{width: '90%'}}
                        label="Votre mot de passe"
                        placeholder="Mot de passe"
                        name="password"
                        type='password'
                        error={this.state.emptypassword}
                        value={this.state.password}
                        onChange={this.handleChangeLogin}
                        helperText={this.state.emptypassword ? this.state.mandatory : ''}
                    /><br/>
                    <div className="button">
                        <Button onClick={this.handleCheckFormConnect} variant="contained" color="primary">
                            Se connecter
                        </Button>
                    </div>
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
                            error={this.state.emptyforgotemail}
                            onChange={this.handleChangeForgot}
                            helperText={!this.checkEmailForgot() ? 'Email invalide.' : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleCheckFormForgot} color="primary">
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