import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";



const styles = {
    card: {
    },
    media: {
        height: 50,
    },
};

class AvailableApps extends Component{

    printApps() {
        let apps = [];

        const {classes} = this.props;

        for (var i = 0; i < 16; i++) {
            apps.push(
                <div style={{width: '20%', display: 'inline-block', margin: '1%'}}>
                    <Card className={classes.card} classes={{root: classes.card}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography>
                                    App {i + 1}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            );
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

AvailableApps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvailableApps);;