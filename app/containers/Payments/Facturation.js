import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import FactureList from '../../components/Payments/FactureList';
const styles = {

};

class Facturation extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    componentWillMount() {
        this.props.passOpen();
    }

    render() {
        return (
            <div>
                {
                    this.props.facturation
                        ? <FactureList/>
                        : ''
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    facturation: state.payments.access_infos
});

Facturation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    passOpen: () => dispatch({ type: 'PASS_POPUP_OPEN' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Facturation));
