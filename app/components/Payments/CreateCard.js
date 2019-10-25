import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CreateCard extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                Comp
            </div>
        );
    }

}

CreateCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {};

};

const mapDispatchToProps = dispatch => {

    return {};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(null)(CreateCard)));
