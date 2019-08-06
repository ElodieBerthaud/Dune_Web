// CardSection.js
import React from 'react';
import {IbanElement} from 'react-stripe-elements';

class IbanSection extends React.Component {
    render() {
        return (
            <label>
                IBAN details
                <IbanElement supportedCountries={["SEPA"]} style={{base: {fontSize: '18px'}}} />
            </label>
        );
    }
}

export default IbanSection;
