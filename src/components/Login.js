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
import {connect} from "react-redux";
import { withRouter } from "react-router";
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';


const emailRegex = require('email-regex');

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

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
            emptyforgotemail: false,
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
        const { onClickChangePass } = this.props;
        if (!emailRegex({exact: true}).test(this.state.emailforgot)){
            this.setState({emptyforgotemail : true});
        }
        else{
            this.setState({ loader: true });
            onClickChangePass(this.state.emailforgot);
        }
    }

    handleCheckFormConnect(){

        const { onClickConnect } = this.props;
        if (!this.state.email || !this.state.password) {
            !this.state.email ? this.setState({emptyemail : true}) : this.setState({emptyemail : false});
            !this.state.password ? this.setState({emptypassword : true}) : this.setState({emptypassword : false});
        }else{

            onClickConnect(this.state.email, this.state.password);
        }
    }

    handleChangeLogin(evt){
        this.setState({[evt.target.name]: evt.target.value});
        if (evt.target.name === 'email') {
            this.state.email !== '' ? this.setState({emptyemail: false}) : this.setState({emptyemail: true});
        }
        else
            this.state.password !== '' ? this.setState({emptypassword : false}) : this.setState({emptypassword : true});
    }

    handleChangeForgot(evt){
        this.setState({[evt.target.name]: evt.target.value});
        !emailRegex({exact: true}).test(this.state.emailforgot) ? this.setState({emptyforgotemail : true}) : this.setState({emptyforgotemail : false});
    }

    checkEmailForgot(){
        return (emailRegex({exact: true}).test(this.state.emailforgot));
    }

    render() {

        const { passpending, passsuccess } = this.props;

        document.body.style.backgroundImage = 'url(http://t.wallpaperweb.org/wallpaper/nature/1440x1080/1733_desert_1440x1080.jpg)';
        document.body.style.backgroundSize = 'cover';

        return (


            <div className="WrapLogin">
                <div style={{margin:'5%'}}>
                    <div className="text-center title">Connexion</div>
                    <form>
                        <TextField
                            required
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
                            required
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
                    <div style={passpending ? {textAlign:'center', margin: '10%'} : {display:'none'}}>
                        <img src={loader} style={{display: 'inherit', margin: '0 auto'}} alt={'loader'}/>
                        Veulliez patienter, votre mail est en cours d'envoi...
                    </div>
                    <div style={passsuccess || passpending ? {display:"none"} : {display:''}}>
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

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        logged: state.login.logged,
        id_user: state.login.id_user,
        passpending: state.password.asking,
        passsuccess: state.password.success,
        passerroor: state.password.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickConnect: (email, pass) => dispatch({ type: "LOGIN_REQUEST", email: email, pass: pass}),
        onClickChangePass: (email) => dispatch({type: "CHANGE_PASSWORD_REQUEST", email: email})
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(Login)));