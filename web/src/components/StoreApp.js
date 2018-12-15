import React, { Component } from 'react';
import "../css/Login.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppsRegistered from './AppsRegistered';
import AvailableApps from './AvailableApps';
import AskedApps from './AskedApps';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class StoreApp extends Component{

    constructor(props) {
        super(props);

        this.state={
            value: 0
        }

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){

        const { classes } = this.props;

        return(
            <div>
                <Card className={classes.card} classes={{root: classes.card}} style={{backgroundColor: '#f6ecf8'}}>
                    <h1 style={{textAlign: 'center'}}>Applications</h1>
                    <CardContent style={{padding: '0', margin:'1%'}}>
                        <Paper className={classes.root} style={{backgroundColor: 'rgb(255, 255, 246)'}}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Applications enregistrées" />
                                <Tab label="Applications disponibles" />
                                <Tab label="Mes demandes d'applications" />
                            </Tabs>
                        </Paper>

                        {this.state.value === 0 && <TabContainer><AppsRegistered /></TabContainer>}
                        {this.state.value === 1 && <TabContainer><AvailableApps /></TabContainer>}
                        {this.state.value === 2 && <TabContainer><AskedApps /></TabContainer>}

                    </CardContent>
                </Card>
            </div>
        );
    }

}

StoreApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StoreApp);