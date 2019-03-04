import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/pdf.worker.entry.js';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class test extends Component{

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        // User clicked submit
    }

    render() {

        return (
            <StripeProvider apiKey="pk_test_BSNzEnrgwUv0HK3wvUGiaDOs">
                <div className="example">
                    <h1>React Stripe Elements Example</h1>
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }


}

export default test;