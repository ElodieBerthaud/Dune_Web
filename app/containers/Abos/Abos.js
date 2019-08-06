import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Abo from '../../components/Abos/Abo';
import PropTypes from 'prop-types';
import PopUp from '../../components/Abos/popUp';

const styles = {
    test: {
    }
}

class Abos extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    componentWillMount() {
        this.props.SubInfos(this.props.token);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.test}>
                <Abo/>
                <PopUp />
            </div>
        );
    }

}

Abos.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        SubInfos: (token) => dispatch({ type: 'GET_SUB_INFO_REQUEST', token})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Abos)));
