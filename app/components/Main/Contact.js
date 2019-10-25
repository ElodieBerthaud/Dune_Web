import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const problems = [
    {
        value: 'Renseignez votre problème',
        label: 'Renseignez votre problème',
    },
    {
        value: 'APPLICATION WEB - Problème technique',
        label: 'APPLICATION WEB - Problème technique',
    },
    {
        value: 'APPLICATION WEB - Problème de paiement/facturation',
        label: 'APPLICATION WEB - Problème de paiement/facturation',
    },
    {
        value: 'APPLICATION MOBILE - Problème technique',
        label: 'APPLICATION MOBILE - Problème technique',
    },
    {
        value: 'TABLE - Problème technique sur le logiciel',
        label: 'TABLE - Problème technique sur le logiciel',
    },
    {
        value: 'TABLE - Problème technique sur le matériel',
        label: 'TABLE - Problème technique sur le matériel',
    },

];

class Contact extends Component {

    constructor(props) {

        super(props);

    }

    state = {
        message: '',
        problems: '0',
    };

    handleChange = name => event => {
        if (name === "problems") {
            console.log(event);
            this.setState({
                [name]: event.target.value,
            });
        } else {
            this.setState({
                [name]: event.target.value,
            });
        }
        console.log(this.state);
    };

    render() {

        return (
            <div>
                <Paper>
                    <div className="contact">
                        <TextField
                            required
                            label="Votre problème"
                            className="in"
                            name="problems"
                            id="outlined-select-currency-native"
                            select
                            label="Votre problème"
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                },
                            }}
                            helperText="Entrez le sujet de votre problème"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('problems')}
                        >
                            {problems.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                    <div className="contact">
                        <TextField
                            required
                            id="outlined-multiline-static"
                            label="Votre message"
                            multiline
                            rows="4"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('message')}
                            style={{width: '70%'}}
                        />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Button style={{margin: '2%'}} variant="contained" color="secondary"
                                onClick={() => this.props.send_support(this.state.problems, this.state.message, this.props.token)}>
                            Envoyer
                        </Button>
                    </div>
                </Paper>
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
        send_support: (probleme, message, token) => dispatch({ type: 'SEND_MESSAGE', probleme, message, token }),
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(null)(Contact)));
