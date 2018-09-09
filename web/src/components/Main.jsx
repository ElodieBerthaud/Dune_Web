import React, {Component} from "react";
import Home from "./Home";
import Test from "./test";
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
import Professor from "./Professor";
import Follow from "./Follow";
import Students from "./Students";
import UserT from "./User_type";


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