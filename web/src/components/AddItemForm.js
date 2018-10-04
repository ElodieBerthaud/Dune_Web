import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import loader from '../images/loaders/bars-loader.gif';
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
            surname: '',
            email: '',
            requiredText1: '',
            requiredText2: '',
            requiredText3: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
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


    handleClickOpen(){
        if (this.state.email === '' || this.state.surname === '' || this.state.surname === '') {
            this.state.lastname === '' ? this.setState({requiredText1 : 'Champs Obligatoire.'}) : false;
            this.state.surname === '' ? this.setState({requiredText2 : 'Champs Obligatoire.'}) : false;
            this.state.email === '' ? this.setState({requiredText3 : 'Champs Obligatoire.'}) : false;
        }
        else if (!emailRegex({exact: true}).test(this.state.email)){
            this.setState({requiredText3 : 'Votre Email n\'est pas valide.'});
        }
        else {
            this.setState({open: true});
        }
    };

    handleClose(){
        this.setState({ open: false });
        this.setState({loader: false});
    };

    handleLoader(){
        this.setState({ loader: true });
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
        this.state.lastname !== '' ? this.setState({requiredText1 : ''}) : false;
        this.state.surname !== '' ? this.setState({requiredText2 : ''}) : false;
        this.state.email !== '' ? this.setState({requiredText3 : ''}) : false;
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div className={classes.container}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        required
                        name="lastname"
                        style={{width:'90%'}}
                        hintText="Nom"
                        floatingLabelText="Nom"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        errorText={this.state.requiredText1}
                    /><br />
                    <TextField
                        required
                        name="surname"
                        style={{width:'90%'}}
                        hintText="Prénom"
                        floatingLabelText="Prénom"
                        value={this.state.surname}
                        onChange={this.handleChange}
                        errorText={this.state.requiredText2}
                    /><br />
                    <TextField
                        required
                        name="email"
                        style={{width:'90%'}}
                        hintText="Adresse Email"
                        floatingLabelText="Adresse Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        errorText={this.state.requiredText3}
                /><br />
                    <div style={{margin: 0 + ' auto', marginTop: 5 + '%'}}>
                        <Typography
                            aria-owns={open ? 'mouse-over-popover' : null}
                            aria-haspopup="true"
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                        >
                             <Button onClick={this.handleClickOpen}  size="large" variant="contained" style={{backgroundColor: '#00bcd4', color:'white'}}>
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
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {textAlign:'center', margin: '10%'} : {display:'none'}}>
                        <img src={loader} style={{display: 'inherit', margin: '0 auto'}} />
                        Veulliez patienter, l'utilisateur est en cours de création...
                    </div>
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

            </div>

        );
    };
}


AddItemForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddItemForm);