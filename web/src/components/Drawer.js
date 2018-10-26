import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mainListItem, secondaryListItem } from './menuDrawer';
import {connect} from "react-redux";

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: 'auto',
    },
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
                <List>{secondaryListItem}</List>
            </div>
        );

        return (
            <div>
                <SwipeableDrawer
                    open={opened}
                    onClose={closeDrawer}
                    onOpen={onOpenDrawer}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(!this.props.open)}
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
    console.log(state.drawer.opened);
    return {
        opened: state.drawer.opened
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenDrawer: () => dispatch({ type: "OPEN_DRAWER_REQUEST" }),
        closeDrawer: () => dispatch({ type: "CLOSE_DRAWER_REQUEST" }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Drawer));