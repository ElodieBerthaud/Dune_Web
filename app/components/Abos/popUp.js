import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Sub from './contentSub';
import Cancel from './contentCancel';

const style = {

};

class popUp extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    render() {
        console.log(this.props.open);
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.ClosePopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {this.props.open ? (this.props.content === 'cancel' ? <Cancel title={this.props.abotitle} id={this.props.aboId}/> : <Sub title={this.props.abotitle} id={this.props.aboId}/>) : ''}
                </Dialog>
            </div>
        );
    }

}

popUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        open: state.subscribe.popupOpen,
        content: state.subscribe.popupContent,
        abotitle: state.subscribe.popupAboTitle,
        aboId: state.subscribe.aboId
    };

};

const mapDispatchToProps = dispatch => {

    return {
        ClosePopup: () => dispatch({ type: 'ABO_POPUP_CLOSE' }),
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(popUp)));
