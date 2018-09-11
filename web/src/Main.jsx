import React, {Component} from "react";
import Home from "./components/Home";
import Test from "./components/test";
import Login from './containers/LoginContainer';
import { Switch, Route } from 'react-router-dom';
import Professor from "./components/Professor";
import Follow from "./components/Follow";
import Students from "./components/Students";
import UserT from "./components/User_type";


class Main extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/professor' component={Professor}/>
                    <Route path='/follow' component={Follow}/>
                    <Route path='/students' component={Students}/>
                    <Route path='/test' component={UserT}/>
                </Switch>
            </main>
        );
    }

}

export default Main;