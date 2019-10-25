import React, { Component } from 'react';
import Test from '../Viewer/test.js';
import {Elements} from 'react-stripe-elements';
import PaymentForm from '../Payments/CardForm';
import Genpdf from './testGenPDF';

class Follow extends Component {
  render() {
    return (
       <div>
           <Elements>
            <PaymentForm />
           </Elements>
       </div>
    );
  }
}

export default Follow;
