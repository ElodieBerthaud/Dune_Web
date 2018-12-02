import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mainListItem, SecondaryListItem } from './menuDrawer';
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import avatar from "../images/avatar.png";

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: 'auto',
    },
    paper:{
        backgroundColor: '#ffeec3'
    }
};

class Drawer extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            open: false
        };

        this.toggleDrawerOpen = this.toggleDrawerOpen.bind(this);
        this.toggleDrawerClose = this.toggleDrawerClose.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawerOpen(){
        this.setState({open: true});
    }

    toggleDrawerClose(){
        return false;
    }

    toggleDrawer = (open) => () => {
        this.setState({
            open: open,
        });
    };

    render() {

        const { classes, opened, closeDrawer, onOpenDrawer} = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>{mainListItem}</List>
                <Divider />
                <SecondaryListItem director={this.props.director} />
            </div>
        );

        return (
            <div>

                <SwipeableDrawer
                    open={opened}
                    onClose={closeDrawer}
                    onOpen={onOpenDrawer}
                    classes={{
                        paper: classes.paper
                    }}
                >
                    <div className={classes.row}>
                        <Avatar
                            alt="Adelle Charles"
                            src={avatar}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            style={{margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'}}
                        />
                    </div>

                    <div style={{textAlign: 'center', marginTop: '5%'}}> {this.props.userName} {this.props.userLastname} </div>

                    <div style={{borderBottom: '1px solid grey', width: '70%', margin: '0 auto', marginTop: '5%'}}> </div>

                    <div
                        tabIndex={0}
                        role="button"
                        onClick={closeDrawer}
                        onKeyDown={this.toggleDrawer(!this.props.open)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Drawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        opened: state.drawer.opened,
        director: state.login.director,
        userName: state.user.name,
        userLastname: state.user.lastname
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenDrawer: () => dispatch({ type: "OPEN_DRAWER_REQUEST" }),
        closeDrawer: () => dispatch({ type: "CLOSE_DRAWER_REQUEST" }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Drawer));