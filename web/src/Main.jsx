import React, {Component} from "react";
import Login from './containers/LoginContainer';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import { Redirect } from 'react-router';
import Professor from "./components/Dashboard";
import Follow from "./components/Follow";
import Students from "./components/Students";
import ManageProfessor from "./components/ManageProfessor";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import P_404 from './components/P_404';
import MySnackbarContent from './components/MySnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            open: true
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        console.log("CLOSSSSE");
        this.setState({open: false});
    }

    render(){

        const log = this.props;

        return(
            <main>
                <Switch>
                    <Route exact path='/' render={() => (
                        log.logged ? (
                            <Redirect to="/dashboard"/>
                        ) : (
                                <Login/>
                            )
                    )}/>
                    <PrivateRoute exact path='/dashboard' component={Professor} authed={log.logged}/>
                    <PrivateRoute exact path='/follow' component={Follow} authed={log.logged}/>
                    <PrivateRoute exact path='/students' component={Students} authed={log.logged}/>
                    <PrivateRoute exact path='/add-professor' component={ManageProfessor} authed={log.director}/>
                    <Route path="*" component={P_404} />
                </Switch>

                <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={log.passSuccess && this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <MySnackbarContent
                    variant="success"
                    message="Votre mot de passe a bien été changé ! un email vient de vous etre Envoyé."
                />
            </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={log.passError}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContent
                        variant="error"
                        message="ERREEEEUR."
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
        passError: state.password.error
    };
};

export default withRouter(connect(mapStateToProps)(Main));