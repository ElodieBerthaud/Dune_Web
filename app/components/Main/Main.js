import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dashboard from '../Dash/Dashboard';
import Students from '../Students/Students';
import ManageProfessor from '../Professors/ManageProfessor';
import Account from '../User/Account';
import PrivateRoute from './PrivateRoute';
import P_404 from './P_404';
import StoreApp from '../Store/StoreApp';
import StudentProfile from '../Students/StudentProfile';
import AddStudent from '../Students/ManageStudent';
import loader from '../../images/loaders/bars-loader.gif';
import AppPage from '../Store/AppPage';
import Class from '../FileManager/Class';
import Test from '../Tests/TestContainer';
import Login from '../Login/Login';
import Abos from '../../containers/Abos/Abos';
import PassPopup from '../Payments/passPopup';
import Facturation from '../../containers/Payments/Facturation';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillUpdate() {
    this.state.open = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.redirect === true && this.props.redirect !== prevProps.redirect) {
      this.setState({ redirect: true });
    }
  }

    checkValidToken = () => {
      const { token, verifyToken } = this.props;

      verifyToken(token);
    }


    handleClose() {
      this.setState({ open: false });

      this.props.resetSnack();

      if (this.props.passSuccess) {
        window.location = '/';
      }
    }

    logout() {
      const { logout_user } = this.props;

      setTimeout(() => {
        logout_user();
      }, 3000);
    }

    render() {
      const log = this.props;

      document.body.style.backgroundColor = '#FFFFF6';
      document.body.style.backgroundImage = '';


      if (this.props.logged) {
        this.checkValidToken();
      }

      if (this.props.tokenUnvalid) {
        this.logout();
      }

      return (
        <main>

          <Dialog
            open={this.props.tokenUnvalid}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>Erreur</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ textAlign: 'center' }}>
                            Votre session a expiré. Vous allez etre redirige vers la page de connexion dans quelques instant...
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Switch>

            <Route
              exact
              path="/"
              render={() => (
                log.logged ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login />
                )
              )}
            />

            <PrivateRoute exact path="/dashboard" component={Dashboard} authed={log.logged} />
            <PrivateRoute exact path="/students" component={Students} authed={log.logged} />
            <PrivateRoute exact path="/store" component={StoreApp} authed={log.logged} />
            <PrivateRoute exact path="/add-professor" component={ManageProfessor} authed={log.director} />
            <PrivateRoute exact path="/account" component={Account} authed={log.logged} />
            <PrivateRoute exact path="/add-student" component={AddStudent} authed={log.logged} />
            <PrivateRoute exact path="/cours" component={Class} authed={log.logged} />
            <PrivateRoute exact path="/student-profile/:id" component={StudentProfile} authed={log.logged} />
            <PrivateRoute exact path="/store/:id" component={AppPage} authed={log.logged} />
            <PrivateRoute exact path="/test" component={Test} authed={log.logged} />
            <PrivateRoute exact path="/abonnements" component={Abos} authed={log.logged} />
            <PrivateRoute exact path="/facturation" component={Facturation} authed={log.logged} />
            <Route path="*" component={P_404} />
          </Switch>
          <Dialog
            open={this.props.loading}
            aria-labelledby="form-dialog-title"
          >
            <div>
              <DialogContent>
                <img alt="chargement" src={loader} style={{ display: 'inherit', margin: '0 auto' }} />
              </DialogContent>
              <DialogActions>
              </DialogActions>
            </div>
          </Dialog>

          <PassPopup open={this.props.passOpen} />

        </main>
      );
    }
}

const mapStateToProps = (state) => ({
  logged: state.login.logged,
  director: state.login.director,
  passSuccess: state.password.success,
  passError: state.password.error,
  errorCode: state.password.errorCode,
  token: state.login.token,
  tokenUnvalid: state.login.tokenUnValid,
  loading: state.loading.loading,
  loadmessage: state.loading.loadmessage,
  redirect: state.snackContent.redirect,
  pathToRedirect: state.snackContent.pathToRedirect,
  passOpen: state.payments.passPopup
});

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch({ type: 'VERIFY_TOKEN_REQUEST', token }),
  logout_user: () => dispatch({ type: 'USER_LOGOUT' }),
  resetSnack: () => dispatch({ type: 'SNACK_RESET' }),
  stopReloadStatus: () => dispatch({ type: 'STOP_RELOAD' })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
