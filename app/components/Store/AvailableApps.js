import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rater from 'react-rater';
import MenuStore from './BuyStoreMenu';
import Loader from '../Main/Loader';
import dashboardStyle from '../Dash/Dashboard/styles/dashboardStyle';
import 'react-rater/lib/react-rater.css';

class AvailableApps extends Component {
  componentWillMount() {
    const { getApps, token } = this.props;

    getApps(token);
  }

  gotToApp(id) {
    window.location = `/store/${id}`;
  }

  printApps() {
    const apps = [];

    const { classes } = this.props;

    const obj = JSON.parse(this.props.apps);

    if (obj != null) {
      for (let i = 0; i < obj.length; i++) {
        apps.push(
          <Grid item md={3} lg={3} style={{ display: 'inline-block' }} key={i}>
            <Card className={classes.card} classes={{ root: classes.card }}>
              <CardActionArea
                onClick={this.gotToApp.bind(this, obj[i].id)}
              >
                <Avatar
                  src={api_url_dev + `/files/apps/${obj[i].picPath}`}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                  style={{
                    margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'
                  }}
                />
                <CardContent style={{ textAlign: 'center' }}>
                  <Rater total={5} rating={4} interactive />
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Loader open={this.props.pending} />
        <Grid container spacing={24}>
          <Grid item sm={3} lg={3} style={{ backgroundColor: '#e5c7eb' }}>
            <MenuStore classes={classes} />
          </Grid>
          <Grid container item sm={9} lg={9} spacing={32}>
            <Paper style={{ maxHeight: '800px', overflow: 'auto' }}>

              {this.printApps()}

            </Paper>

          </Grid>
        </Grid>
      </div>
    );
  }
}

AvailableApps.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  token: state.login.token,
  apps: state.storeBuy.apps,
  pending: state.storeBuy.pending
});

const mapDispatchToProps = (dispatch) => ({
  getApps: (token) => dispatch({ type: 'GET_APPS_BUY_REQUEST', token })

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AvailableApps)));
