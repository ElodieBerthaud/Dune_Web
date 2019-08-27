import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//stepper
import StepperTutorial from './StepperTutorial';

const style = {
    title: {
        textAlign: 'center'
    }
};

class Tutorial extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    render() {
        const classes = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.tutorial}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="xl"
                >
                    <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>Bienvenue sur votre espace Dune !</DialogTitle>
                    <StepperTutorial />

                </Dialog>
            </div>
        );
    }

}

Tutorial.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = state => {

    return {
        tutorial: state.login.tutorial
    };

};

const mapDispatchToProps = dispatch => {

    return {};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Tutorial)));
