import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import '../css/Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleProfessor = this.handleProfessor.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.handleStudents = this.handleStudents.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});


    handleLogin(){
        window.location = '/login';
    }

    handleProfessor(){
        window.location = '/professor';
    }

    handleFollow(){
        window.location = '/follow';
    }

    handleStudents(){
        window.location = '/students';
    }

    handleTest(){
        window.location = '/test';
    }

    render() {
        return (
            <div className="text-center">
                <header>
                    <AppBar
                        title="Dune"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonClick={this.handleToggle}
                        style={{height: '100px'}}
                    />
                </header>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    containerStyle={{backgroundColor: '#fee599'}}
                >
                    <header style={{height: '20%'}}>
                        <img style={{width: '100%', height: '100%'}} src={require('../images/dune.png')}/>
                    </header>
                    <MenuItem onClick={this.handleLogin}>Se connecter</MenuItem>
                    <MenuItem onClick={this.handleProfessor}>Mon espace professeur</MenuItem>
                    <MenuItem onClick={this.handleFollow}>Suivi</MenuItem>
                    <MenuItem onClick={this.handleStudents}>Trombinoscope</MenuItem>
                    <MenuItem onClick={this.handleTest}>Test</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default Header;