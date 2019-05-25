import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Timelapse from '@material-ui/icons/Build';

const styles = {};

class CommingSoon extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const { classes } = this.props;

    return (
      <div className="CommingSoon">
        <Typography className="inside">Cette fonctionalité n'est pas encore disponible. Elle le sera très prochainement.</Typography>
        <Timelapse className="icon" />
      </div>
    );
  }
}

CommingSoon.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  test: (message) => dispatch({ type: 'SNACK_PUT_SUCCESS', message: 'Le nouvel eleve a bien ete ajoute.' })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommingSoon)));
