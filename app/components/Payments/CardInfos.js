import React, {Component} from 'react';
import classNames from 'classnames';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

//Material-UI
import './payments.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';

//ressources
import visamaster from '../../images/payments/visamaster.jpg';
import stripe from '../../images/payments/stripe.png';


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

const styles = theme => ({
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

class CardInfos extends Component {
    state = {
        errorMessage: '',
        error: true,
        arrowRef: null,
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (!this.state.error) {
            this.props.addPaymentMethod(this.props.token, this.props.stripe);
        }
    };

    handleChange = ({error}) => {
        if (error) {
            this.setState({error: true});
            this.setState({errorMessage: error.message});
        } else {
            this.setState({error: false});
        }
    };

    render(){
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: this.props.successMethod,
        });
        console.log(this.props.errorMsg);

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className={this.props.successMethod ? 'disableForm' : ''}>
                <div className="split-form">
                    <label>
                        Numéro de carte
                        <CardNumberElement
                            {...createOptions()}
                            onChange={this.handleChange}
                            disabled={this.props.successMethod === true}
                        />
                    </label>
                    <label>
                        Date d'expiration
                        <CardExpiryElement
                            {...createOptions()}
                            onChange={this.handleChange}
                            disabled={this.props.successMethod === true}
                        />
                    </label>
                </div>
                <div className="split-form">
                    <label>
                        CVC
                        <CardCVCElement {...createOptions()} onChange={this.handleChange} disabled={this.props.successMethod === true}/>
                    </label>
                    <label>
                        Code postal
                        <input
                            name="name"
                            type="text"
                            placeholder="94115"
                            className="StripeElement"
                            required
                            disabled={this.props.successMethod === true}
                        />
                    </label>
                </div>
            </div>
            <div className="error" role="alert">
                {this.props.errorMsg}
            </div>

            <div className="btnWrapper">
                <button
                    onClick={this.handleSubmit}
                    className={buttonClassname + ' payBtn'}
                    disabled={this.props.methodLoading || this.props.successMethod}
                >
                    {this.props.successMethod ? 'Votre carte est enregistrée'  : 'Enregistrer le moyen de paiement'}
                    {this.props.successMethod ? <DoneIcon />  : ''}
                </button>
                {this.props.methodLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </form>
        )}
}

const mapStateToProps = state => {

    return {
        token: state.login.token,
        methodLoading: state.addPayment.loading,
        successMethod: state.addPayment.success,
        errorMsg: state.addPayment.errorMsg
    };

};

const mapDispatchToProps = dispatch => {

    return {
        addPaymentMethod: (tokenSession, cardElement) => dispatch({type: 'ADD_METHOD_REQUEST', tokenSession, cardElement })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectStripe((withStyles(styles)(CardInfos)))));
