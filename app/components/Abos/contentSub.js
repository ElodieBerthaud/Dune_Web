import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const style = {

};

class contentSub extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                <DialogTitle id="alert-dialog-title">Souscrire à l'abonnement {this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous êtes sur le point de choisir un nouvel abonnement. En cliquant sur valider, vous serez redirigé vers une page de paiement sécurisé.
                        Voulez-vous continuer ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.ClosePopup} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Continuer
                    </Button>
                </DialogActions>
            </div>
        );
    }

}

contentSub.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {};

};

const mapDispatchToProps = dispatch => {

    return {
        ClosePopup: () => dispatch({ type: 'ABO_POPUP_CLOSE' })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(contentSub)));
