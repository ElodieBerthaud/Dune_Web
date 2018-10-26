import React, {Component} from "react";
import Login from './containers/LoginContainer';
import { Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import { Redirect } from 'react-router';
import Professor from "./components/Professor";
import Follow from "./components/Follow";
import Students from "./components/Students";
import ManageProfessor from "./components/ManageProfessor";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import P_404 from './components/P_404';

class Main extends Component{

    render(){

        const log = this.props;

        return(
            <main>
                <Switch>
                    <Route exact path='/' render={() => (
                        log.logged ? (
                            <Redirect to="/professor"/>
                        ) : (
                                <Login/>
                            )
                    )}/>
                    <PrivateRoute exact path='/professor' component={Professor} authed={log.logged}/>
                    <PrivateRoute exact path='/follow' component={Follow} authed={log.logged}/>
                    <PrivateRoute exact path='/students' component={Students} authed={log.logged}/>
                    <PrivateRoute exact path='/add-professor' component={ManageProfessor} authed={log.logged}/>
                    <Route path="*" component={P_404} />
                </Switch>
            </main>
        );
    }

}

const mapStateToProps = state => {
    return {
        logged: state.login.logged
    };
};

export default withRouter(connect(mapStateToProps)(Main));