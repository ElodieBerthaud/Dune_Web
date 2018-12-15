import React, {Component} from "react";
import Login from './containers/LoginContainer';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import { Redirect } from 'react-router';
import Dashboard from "./components/Dashboard";
import Follow from "./components/Follow";
import Students from "./components/Students";
import ManageProfessor from "./components/ManageProfessor";
import Account from "./components/Account";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import P_404 from './components/P_404';
import MySnackbarContent from './components/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import StoreApp from './components/StoreApp';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StudentProfile from './components/StudentProfile';
import AddStudent from './components/ManageStudent';

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            open: true
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){

        this.setState({open: false});

        if (this.props.passSuccess){
            window.location = '/';
        }
    }

    componentWillUpdate(){
        this.state.open = true;
    }

    checkValidToken(){

        const {token, verifyToken} = this.props;

        verifyToken(token);

    }

    logout(){

        const {logout_user} = this.props;

            setTimeout(function () {
                logout_user();
            }, 3000);

    }

    render(){


        const log = this.props;

        document.body.style.backgroundColor = '#FFFFF6';
        document.body.style.backgroundImage = '';

        if (this.props.logged){
            this.checkValidToken();
        }

        if (this.props.tokenUnvalid){
            this.logout();
        }

        return(
            <main>
                <Dialog
                    open={this.props.tokenUnvalid}
                    aria-labelledby="scroll-dialog-title">
                    <DialogTitle id="scroll-dialog-title" style={{textAlign: 'center'}}>Erreur</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{textAlign: 'center'}}>
                            Votre session a expiré. Vous allez etre redirige vers la page de connexion dans quelques instant...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Switch>
                    <Route exact path='/' render={() => (
                        log.logged ? (
                            <Redirect to="/dashboard"/>
                        ) : (
                                <Login/>
                            )
                    )}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard} authed={log.logged}/>
                    <PrivateRoute exact path='/follow' component={Follow} authed={log.logged}/>
                    <PrivateRoute exact path='/students' component={Students} authed={log.logged}/>
                    <PrivateRoute exact path='/store' component={StoreApp} authed={log.logged}/>
                    <PrivateRoute exact path='/add-professor' component={ManageProfessor} authed={log.director}/>
                    <PrivateRoute exact path='/account' component={Account} authed={log.logged}/>
                    <PrivateRoute exact path='/add-student' component={AddStudent} authed={log.logged}/>
                    <PrivateRoute exact path='/student-profile/:id' component={StudentProfile} authed={log.logged}/>
                    <Route path="*" component={P_404} />
                </Switch>

                <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.props.success && this.state.open}
                autoHideDuration={4000}
                onClose={this.handleClose}
            >
                <MySnackbarContent
                    variant="success"
                    message={this.props.message}
                />
            </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.error && this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContent
                        variant="error"
                        message={this.props.message}

                    />
                </Snackbar>
            </main>
        );
    }

}

const mapStateToProps = state => {
    return {
        logged: state.login.logged,
        director: state.login.director,
        passSuccess: state.password.success,
        passError: state.password.error,
        errorCode: state.password.errorCode,
        error: state.snackContent.error,
        success: state.snackContent.success,
        message: state.snackContent.message,
        token: state.login.token,
        tokenUnvalid: state.login.tokenUnValid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        verifyToken: (token) => dispatch({ type: "VERIFY_TOKEN_REQUEST", token }),
        logout_user: () => dispatch({ type: "USER_LOGOUT" })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));