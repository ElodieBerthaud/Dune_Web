import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});
class contentSub extends Component {

    constructor(props) {

        super(props);

        this.state = {
            plan: 0
        };

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <DialogTitle id="alert-dialog-title">Souscrire à l'abonnement {this.props.title}</DialogTitle>
                <DialogContent className="justify">
                    <DialogContentText id="alert-dialog-description">
                        Vous êtes sur le point de choisir un nouvel abonnement.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        En choisissant la <span style={{fontWeight: 'bold', color: '#8bc34a'}}>Formule mensuelle</span>, Vous serez facturé de <span style={{fontWeight: 'bold', color: '#8bc34a'}}>{this.props.priceMonth} euros </span> par mois.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        En choisissant la <span style={{fontWeight: 'bold', color: '#8bc34a'}}>Formule Annuelle</span>, Vous serez facturé de <span style={{fontWeight: 'bold', color: '#8bc34a'}}>{this.props.priceYear} euros </span> en une fois.
                    </DialogContentText>
                    <DialogContentText>
                        Vous avez le choix entre deux formule:
                    </DialogContentText>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Formule</FormLabel>
                        <RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.plan}
                            onChange={this.handleChange}
                            name="plan"
                        >
                            <FormControlLabel value={"1"} control={<Radio />} label="Formule MENSUELLE" />
                            <FormControlLabel value={"2"} control={<Radio />} label="Formule ANNUELLE" />
                        </RadioGroup>
                    </FormControl>
                    <DialogContentText style={{color: '#c23d4b'}}>
                        En cliquant sur CONTINUER, vous serez débité sur la carte que vous avez enregistré précédement. Vous recevrez un reçu par mail.
                        Si vous avez choisi le formule MENSUELLE, alors vous serez debité tous les mois à la date de votre souscription.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.ClosePopup} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => this.props.SubscribeAbo(this.state.plan, this.props.token)} color="primary" autoFocus>
                        Continuer
                    </Button>
                </DialogActions>
            </div>
        );
    }

}

contentSub.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        priceYear: state.subscribe.priceYear,
        priceMonth: state.subscribe.priceMonth,
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        ClosePopup: () => dispatch({ type: 'ABO_POPUP_CLOSE' }),
        SubscribeAbo: (plan, token) => dispatch({ type: 'SUBSCRIBE_ABO_REQUEST', plan, token })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(contentSub)));
