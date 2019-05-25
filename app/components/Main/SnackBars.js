import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import MySnackbarContent from '../Snacks/MySnackbarContent';


class SnackBars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      redirect: false,
      redirectContent: null
    };
  }

    handleClose = () => {
      if (this.props.redirect !== null && this.props.redirect === true) {
        if (this.props.pathToRedirect === window.location.pathname) {
          this.props.resetSnack();
          window.location.reload();
        } else if (this.props.pathToRedirect === '/login') {
          this.props.handleLogoutRedux();
          return;
        }
        window.location = this.props.pathToRedirect;
      }
      this.props.resetSnack();
    }

    render() {
      return (
        <div>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={(this.props.success || this.props.error)}
            autoHideDuration={2000}
            onClose={this.handleClose}
          >
            <MySnackbarContent
              variant={this.props.success ? 'success' : 'error'}
              message={this.props.message}
            />
          </Snackbar>
          <Switch>
            {this.state.redirectContent}
          </Switch>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  error: state.snackContent.error,
  success: state.snackContent.success,
  message: state.snackContent.message,
  redirect: state.snackContent.redirect,
  pathToRedirect: state.snackContent.pathToRedirect
});

const mapDispatchToProps = (dispatch) => ({
  resetSnack: () => dispatch({ type: 'SNACK_RESET' }),
  handleLogoutRedux: () => dispatch({ type: 'USER_LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)((SnackBars));
