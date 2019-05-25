import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Rater from 'react-rater';
import classNames from 'classnames';
import dashboardStyle from '../Dash/Dashboard/styles/dashboardStyle';

const styles = {
  card: {
  },
  media: {
    height: 50,
  },
  noResults: {

  }
};

class AppsRegistered extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getApps, token } = this.props;

    getApps(token, this.props.idEcole);
  }

  gotToApp(id) {
    window.location = `/store/${id}`;
  }

  printApps() {
    const apps = [];

    const { classes } = this.props;

    const obj = JSON.parse(this.props.apps);


    if (obj != null) {
      if (obj.length > 0) {
        for (let i = 0; i < obj.length; i++) {
          apps.push(
            <Grid item md={3} lg={3} style={{ display: 'inline-block' }} key={i}>
              <Card className={classes.card} classes={{ root: classes.card }}>
                <CardActionArea
                  onClick={this.gotToApp.bind(this, obj[i].id)}
                >
                  <Avatar
                    src={`http://176.31.252.134:9001/files/apps/${obj[i].picPath}`}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                    style={{
                      margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'
                    }}
                  />
                  <CardContent style={{ textAlign: 'center' }}>
                    <Rater total={5} rating={4} interactive />
                    <Typography>
                      {obj[i].nomApp}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
      } else {
        apps.push(
          <div key={1}>
            <h2>
                            Vous ne possédez aucun jeu dans cette école. {this.props.isDirector ? 'Pour en acheter un,' : 'Pour en demander un à votre directeur, '} veuillez vous rendre dans l'onglet <span style={{ fontStyle: 'italic' }}>"Applications disponibles"</span>.
            </h2>
          </div>
        );
      }
    }

    return apps;
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.printApps()}
      </div>
    );
  }
}

AppsRegistered.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  token: state.login.token,
  apps: state.appRegistred.apps,
  idEcole: state.login.idEcole,
  isDirector: state.login.director
});

const mapDispatchToProps = (dispatch) => ({
  getApps: (token, idEcole) => dispatch({ type: 'GET_APPS_REGISTRED_REQUEST', token, idEcole })

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AppsRegistered)));
