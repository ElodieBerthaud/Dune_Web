import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CardInfos from './CardInfos';
import {
    injectStripe
} from 'react-stripe-elements';

//Material-UI
import Grid from '@material-ui/core/Grid';
import './payments.css';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

//ressources
import visamaster from '../../images/payments/visamaster.jpg';
import stripe from '../../images/payments/stripe.png';

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`,
            },
        },
    };
}

const styles = theme => ({
    htmlPopper: arrowGenerator('#dadde9'),
    htmlTooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        '& b': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
    arrow: {
        position: 'absolute',
        fontSize: 6,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    buttonSuccess: {
        backgroundColor: '#8bc34a',
        '&:hover': {
            backgroundColor: '#8bc34a',
        },
    },
    buttonProgress: {
        color: '#8bc34a',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class CardForm extends Component {
    state = {
        errorMessage: '',
        error: true,
        arrowRef: null,
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="container">
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={6} className="payForm">
                            <CardInfos />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <div className="justify paymentTextContainer">
                            <p>
                                Lors de vos futurs achats d'application ou d'abonnements, vous aurez besoin de payer par carte bancaire.
                                Pour cela, nous vous proposons d'enregistrer celle-ci afin de pouvoir la ré-utiliser plus tard.
                            </p>
                            <p>
                                Pour mettre en place ce système de paiement, nous utilisons les services de
                                <Tooltip
                                    classes={{
                                        popper: classes.htmlPopper,
                                        tooltip: classes.htmlTooltip,
                                    }}
                                    PopperProps={{
                                        popperOptions: {
                                            modifiers: {
                                                arrow: {
                                                    enabled: Boolean(this.state.arrowRef),
                                                    element: this.state.arrowRef,
                                                },
                                            },
                                        },
                                    }}
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit" style={{fontStyle: 'italic'}}>

                                                «Stripe est une entreprise de technologie qui développe une infrastructure économique pour Internet.
                                                Les entreprises de toutes tailles, des startups aux sociétés cotées en bourse, utilisent notre suite d'outils pour accepter des paiements et gérer leur activité en ligne.»

                                            </Typography>
                                            <Typography>
                                                - https://stripe.com/fr/about
                                            </Typography>
                                        </React.Fragment>
                                    }
                                >
                                    <a target="_blank" style={{fontStyle: 'italic', fontWeight: 'bold', color: '#556cd6', textDecoration: 'none'}} href="https://stripe.com/fr/about"> Stripe</a>
                                </Tooltip>
                                .
                            </p>
                            <p>
                                Cela vous evitera de rentrer les informations de votre carte à chaque fois que vous effectuez un achat.
                            </p>
                            <p>
                                Vous pourrez, à tout moment, modifier ou supprimer les informations de votre carte bancaire depuis le menu de votre espace Dune.
                            </p>
                            <p style={{fontWeight: 'bold', color: '#c23d4b'}}>
                                En aucun cas l'entreprise Dune n'utilisera vos informations bancaires sans votre accord ni ne vous demandera de les lui communiquer par mail ou téléphone.
                            </p>
                        </div>
                        <Divider variant="middle"/>

                        <Paper>
                        <h2 className="paymentTextStyle">Paiement sécurisé <DoneIcon /></h2>
                            <div className='text-center'>
                                <img className="cardImg" src={visamaster}/><br/>
                                <img style={{maxWidth: '100px'}} src={stripe}/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        SubInfos: (token) => dispatch({ type: 'GET_SUB_INFO_REQUEST', token})
    };

};

export default withRouter(connect(null, mapDispatchToProps)(injectStripe((withStyles(styles)(CardForm)))));
