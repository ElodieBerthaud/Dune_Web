import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {withRouter} from "react-router";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

const emailRegex = require('email-regex');



const styles = {
    root: {
        flexGrow: 1,
    },
};

class ChangeIdentifiant extends Component{

    constructor(props) {
        super(props);

        this.state = {
            Newemail: '',
            message: '',
            askPass: false,
            pass: ''
        }

        this.handleCheckIdent = this.handleCheckIdent.bind(this);
        this.handleChangeValues = this.handleChangeValues.bind(this);
        this.handleChangeIdent = this.handleChangeIdent.bind(this);
    }

    handleCheckIdent(){

        if (!emailRegex({exact: true}).test(this.state.Newemail)){
            this.state.message = 'Verifiez le format de vos identifiants. Cela doit etre une adresse email.';

            this.props.SendAlert(this.state.message);
        }
        else{
            this.setState({askPass: true});
        }
    }

    handleChangeValues(evt){
        this.setState({[evt.target.name]: evt.target.value});
    }

    handleChangeIdent(){

        this.props.changeIdent(this.props.token, this.props.idUser, this.state.pass, this.state.Newemail);
    }

    render(){

        return(
            <div style={{textAlign: 'center'}}>
                <TextField
                    required
                    onChange={this.handleChangeValues}
                    style={{width: '90%'}}
                    label="Votre nouvel identifiant"
                    placeholder="identifiant"
                    name="Newemail"
                    value={this.state.Newemail}
                /><br/>

                <Button
                    onClick={this.handleCheckIdent}
                    variant="contained" color="primary"// <-- Just add me!
                    // label='My Label' className={classes.button}
                    style={{backgroundColor:'#ffa726', marginTop: '5%'}}
                >
                    Valider
                </Button>

                <Dialog
                    open={this.state.askPass}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div>
                        <DialogContent>
                            Pour poursuivre, veuillez taper votre mot de passe.
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                required
                                onChange={this.handleChangeValues}
                                style={{width: '90%'}}
                                label="Votre nouvel identifiant"
                                placeholder="identifiant"
                                name="pass"
                                type='password'
                                value={this.state.pass}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleChangeIdent} color="primary">
                                Valider
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }

}

ChangeIdentifiant.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        token: state.login.token,
        idUser: state.login.id_user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SendAlert: (message) => dispatch({ type: "SNACK_PUT_ERROR", message }),
        changeIdent: (token, idUser, password, newEmail) => dispatch({ type: "CHANGE_IDENTI_REQUEST", token, idUser, password, newEmail })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangeIdentifiant)));