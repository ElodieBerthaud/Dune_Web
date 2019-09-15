import React, {Component} from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe,
    ReactStripeElements,
    StripeProvider,
    Elements,
} from 'react-stripe-elements';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

//Material-UI
import Grid from '@material-ui/core/Grid';

import './payments.css';

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        },
    };
};

class CardForm extends Component {
    state = {
        errorMessage: '',
        error: true
    };

    handleChange = ({error}) => {
        if (error) {
            this.setState({error: true});
            this.setState({errorMessage: error.message});
        } else {
            this.setState({error: false});
        }
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (!this.state.error) {
            this.props.addPaymentMethod(this.props.token, this.props.stripe);
        }
    };

    render() {
        return (
            <div className="container">
                <Grid container spacing={16}>
                    <Grid item xs={12} md={8} className="payForm">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="split-form">
                                <label>
                                    Numéro de carte
                                    <CardNumberElement
                                        {...createOptions()}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <label>
                                    Date d'expiration
                                    <CardExpiryElement
                                        {...createOptions()}
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                            <div className="split-form">
                                <label>
                                    CVC
                                    <CardCVCElement {...createOptions()} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Code postal
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="94115"
                                        className="StripeElement"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="error" role="alert">
                                {this.state.errorMessage}
                            </div>

                            <div>
                                <button onClick={this.handleSubmit} className="payBtn">Enregistrer le moyen de paiement</button>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={4} className="justify">
                        <p>
                            Lors de vos futurs achats d'application ou d'abonnements, vous aurez besoin de payer par carte bancaire.
                            Pour cela, nous vous proposons d'enregistrer celle-ci afin de pouvoir la ré-utiliser plus tard.
                        </p>
                        <p>
                            Cette méthode est totalement sécurisée, et seul vous y avez accès. Nous n'utilisons pas votre carte pour faire des achats
                            ou des renouvellements sans votre permission.
                        </p>
                        <p>
                            Cela vous evitera de rentrer les informations de votre carte à chaque fois que vous effectuez un achat.
                        </p>
                        <p>
                            Vous pourrez, à tout moment, modifier ou supprimer les informations de votre carte bancaire.
                        </p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        addPaymentMethod: (tokenSession, cardElement) => dispatch({type: 'ADD_METHOD_REQUEST', tokenSession, cardElement })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectStripe(CardForm)));
