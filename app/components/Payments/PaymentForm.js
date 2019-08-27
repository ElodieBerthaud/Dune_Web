import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

/*import AddressSection from './AddressSection';
import CardSection from './CardSection';*/
import IbanSection from '../Payments/IbanSection';

class PaymentForm extends React.Component {

    submit = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.props.handleSubmit(this.props.stripe);
    }

    render() {
        return (
            <form onSubmit={(event) => this.submit(event)}>
                <IbanSection />
                <button type="submit" >Confirmer IBAN</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        handleSubmit: (stripe) => dispatch({ type: 'SUBMIT_IBAN_REQUEST', stripe }),
    };

};

export default injectStripe(withRouter(connect(null, mapDispatchToProps)(withStyles(null)(PaymentForm))));
