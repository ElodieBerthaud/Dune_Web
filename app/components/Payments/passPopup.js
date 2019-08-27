import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

const style = {

};

class passPopup extends Component {

    constructor(props) {

        super(props);

        this.state = {
            pass: '',
            showPassword: false
        };

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState((state) => ({ showPassword: !state.showPassword }));
    };

    render() {
        return (
            <div>
                <Dialog
                    open={!this.props.open && window.location.pathname === "/facturation"}
                    onClose={this.props.passClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Veuillez entrer votre mot de passe.</DialogTitle>
                    <DialogContent>
                        <InputLabel htmlFor="password">Mot de passe</InputLabel><br />
                        <Input
                            name="password"
                            id="password"
                            autoComplete="false"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.pass}
                            onChange={this.handleChange('pass')}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.passClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={() => this.props.validPass(this.props.token, this.state.pass)} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

passPopup.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    open: state.payments.access_infos,
    token: state.login.token
});

const mapDispatchToProps = dispatch => {

    return {
        passClose: () => dispatch({ type: 'PASS_POPUP_CLOSE' }),
        validPass: (token, password) => dispatch({type: 'ACCESS_PAYMENT_INFOS_REQUEST', token, password})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(passPopup)));
