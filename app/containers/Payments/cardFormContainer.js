import React, { Component } from 'react';
import {Elements} from 'react-stripe-elements';
import CardForm from '../Payments/CardForm';

class cardFormContainer extends Component {
    render() {
        return (
            <div>
                <Elements>
                    <CardForm />
                </Elements>
            </div>
        );
    }
}

export default cardFormContainer;
