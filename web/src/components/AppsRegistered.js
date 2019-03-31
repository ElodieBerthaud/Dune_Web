import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router";
import dashboardStyle from "./Dashboard/styles/dashboardStyle.jsx";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Rater from 'react-rater';
import classNames from 'classnames';

const styles = {
    card: {
    },
    media: {
        height: 50,
    },
};

class AppsRegistered extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){

        const { getApps, token } = this.props;

        getApps(token, this.props.idEcole);

    }

    gotToApp(id){

        window.location = '/store/' + id;

    }

    printApps() {
        let apps = [];

        const { classes } = this.props;

        let obj = JSON.parse(this.props.apps);

        //var tmp = 0;

        if (obj != null) {

            for (var i = 0; i < obj.length; i++) {
                apps.push(
                    <Grid  item md={3} lg={3} style={{display: 'inline-block'}} key={i}>
                        <Card className={classes.card} classes={{root: classes.card}}>
                            <CardActionArea
                                onClick={this.gotToApp.bind(this, obj[i].id)}>
                                <Avatar
                                    src={"http://176.31.252.134:7001/files/apps/" + obj[i].picPath}
                                    className={classNames(classes.avatar, classes.bigAvatar)}
                                    style={{margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'}}
                                />
                                <CardContent style={{textAlign: 'center'}}>
                                    <Rater total={5} rating={4} interactive={true} />
                                    <Typography>
                                        { obj[i].nomApp }
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            }
        }

        return apps;
    }

    render(){

        return(
            <div style={{textAlign: 'center'}}>
                {this.printApps()}
            </div>
        );
    }

}

AppsRegistered.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        token: state.login.token,
        apps: state.appRegistred.apps,
        idEcole: state.login.idEcole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getApps: (token, idEcole) => dispatch({ type: "GET_APPS_REGISTRED_REQUEST", token, idEcole})

    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AppsRegistered)));