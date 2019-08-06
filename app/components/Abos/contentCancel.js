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

class contentCancel extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                <DialogTitle id="alert-dialog-title">Mettre fin à votre abonnement {this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vous êtes sur le point de mettre fin à votre abonnement. En continuant, vous serez redirigé vers le formulaire d'annulation.
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

contentCancel.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(contentCancel)));
