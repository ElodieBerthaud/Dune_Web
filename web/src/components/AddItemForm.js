import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import loader from '../images/loaders/bars-loader.gif';
import {connect} from "react-redux";
import check from './../images/loaders/icons8-approval-100.png';
import error from './../images/loaders/error.png';

const emailRegex = require('email-regex');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    popover: {
        pointerEvents: 'none',
    },
});

class AddItemForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
            loader: false,
            lastname: '',
            name: '',
            email: '',
            validateemail: false,
            emptysurname: false,
            emptylastname: false,
            mandatory: 'Ce champs est obligatoire.',
            validemail: 'Votre Email n\'est pas valide.',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleValidForm = this.handleValidForm.bind(this);
        this.handleLoader = this.handleLoader.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
    }



    handlePopoverOpen(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose(){
        this.setState({ anchorEl: null });
    };


    handleValidForm(){
        if (this.state.surname === '' || this.state.lastsurname === '' || !emailRegex({exact: true}).test(this.state.email)) {

            this.state.lastname === '' ? this.setState({emptylastname : true}) : this.setState({emptylastname : false});
            this.state.surname === '' ? this.setState({emptysurname : true}) : this.setState({emptysurname : false});
            !emailRegex({exact: true}).test(this.state.email) ? this.setState({validateemail : true}) : this.setState({validateemail : false});
        }
        else {
            this.setState({open: true});
        }
    };

    handleClose(){
        this.setState({ open: false });
        this.setState({ loader: false });
    };

    handleClose_error(){
        window.location.reload();
    };

    handleLoader(){

        const { addProfessor } = this.props;

        this.setState({ loader: true });

        addProfessor(this.state.lastname, this.state.name, this.state.email, this.props.token);
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
        this.state.lastname === '' ? this.setState({emptylastname : true}) : this.setState({emptylastname : false});
        this.state.name === '' ? this.setState({emptysurname : true}) : this.setState({emptysurname : false});
        emailRegex({exact: true}).test(this.state.email) === false ? this.setState({validateemail : false}) : this.setState({validateemail : true});
    }

    render() {
        const { classes, addSuccess } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        if (this.props.addSuccess != null && this.props.addSuccess){
                this.state.loader = false;
                this.state.open = false;
                this.state.error = false;
        }
        else if (this.props.addSuccess != null && !this.props.addSuccess){
                this.state.loader = false;
                this.state.open = false;
                this.state.error = true;
        }
        else if (this.props.addSuccess === null){
            this.state.error = false;
        }

        return (
            <div className={classes.container}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        name="lastname"
                        style={{width:'90%'}}
                        label="Nom"
                        placeholder="Nom"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        error={this.state.emptylastname}
                        helperText={this.state.emptylastname ? this.state.mandatory : ''}
                    /><br />
                    <TextField
                        required
                        name="name"
                        style={{width:'90%'}}
                        label="Prénom"
                        placeholder="Prénom"
                        value={this.state.name}
                        onChange={this.handleChange}
                        error={this.state.emptysurname}
                        helperText={this.state.emptysurname ? this.state.mandatory : ''}
                    /><br />
                    <TextField
                        required
                        name="email"
                        style={{width:'90%'}}
                        label="Adresse Email"
                        placeholder="Adresse Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        error={this.state.validateemail}
                        helperText={emailRegex({exact: true}).test(this.state.email) ? '' : 'Email invalide.'}
                /><br />
                    <div style={{margin: 0 + ' auto', marginTop: 5 + '%'}}>
                        <Typography
                            aria-owns={open ? 'mouse-over-popover' : null}
                            aria-haspopup="true"
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                        >
                             <Button onClick={this.handleValidForm}  size="large" variant="contained" style={{backgroundColor: '#00bcd4', color:'white'}}>
                                Valider
                            </Button>
                        </Typography>
                            <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                    paper: classes.paper,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={this.handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography style={{padding: 2 + '%'}}>
                                    En validant le formulaire, un mail va être envoyé au professeur que vous venez d'ajouter, avec son identifiant et son mot de passe.
                                </Typography>
                            </Popover>
                    </div>
                </form>

                <Dialog
                    open={this.state.loader}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {textAlign:'center', margin: '10%'} : {display:'none'}}>

                    </div>
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">Ajout d'un professeur</DialogTitle>
                        <DialogContent>
                            <img alt='chargement' src={loader} style={{display: 'inherit', margin: '0 auto'}} />
                            Veulliez patienter, l'utilisateur est en cours de création...
                        </DialogContent>
                    </div>
                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">Ajout d'un professeur</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Vous êtes sur le point de créer un nouvel utilisateur de Dune au sein de votre établissement, voulez-vous continuer?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.handleLoader} color="primary">
                                Continuer
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

                <Dialog
                    open={this.state.error}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">Erreur Lors de l'ajout d'un professeur</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <img alt='chargement' src={error} style={{display: 'inherit', margin: '0 auto'}} />
                                {this.props.error === 501 ? 'Un compte existe déja avec cette adresse email. veuillez en entrer une autre.' : ''}
                                {this.props.error === 401 ? 'Votre session a expirée.' : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose_error} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

                <Dialog
                    open={addSuccess === null ? false : addSuccess === true ? true : false}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">L'ajout a bien été effectué !</DialogTitle>
                        <DialogContent>
                            <img alt='chargement' src={check} style={{display: 'inherit', margin: '0 auto'}} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose_error} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

            </div>

        );
    };
}


const mapStateToProps = state => {
    return {
        token: state.login.token,
        addSuccess: state.manageProfessor.success,
        error: state.manageProfessor.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProfessor: (surname, name, email, token) => dispatch({ type: "ADD_PROFESSOR_REQUEST" , surname: surname, name: name, email: email, token: token})
    };
};


AddItemForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddItemForm));