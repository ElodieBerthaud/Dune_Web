import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const style = {

};

class passPopup extends Component {

    constructor(props) {

        super(props);

        this.state = {
            pass: ''
        };

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
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
                        <TextField
                            id="standard-name"
                            label="Mot de passe"
                            value={this.state.pass}
                            onChange={this.handleChange('pass')}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.passClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.props.validePass} color="primary" autoFocus>
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
    open: state.payments.access_infos
});

const mapDispatchToProps = dispatch => {

    return {
        passClose: () => dispatch({ type: 'PASS_POPUP_CLOSE' }),
        validePass: () => dispatch({type: 'ACCESS_PAYMENT_INFOS_SUCCESS'})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(passPopup)));
