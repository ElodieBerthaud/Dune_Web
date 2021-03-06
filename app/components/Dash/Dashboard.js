import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import Games from '@material-ui/icons/Games';
import Apps from '@material-ui/icons/Apps';
// core components


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Visibility';
import dashboardStyle from './Dashboard/styles/dashboardStyle.jsx';
import {
  dailySalesChart
} from './variables/charts.jsx';
import CardFooter from './Dashboard/CardFooter.jsx';
import CardBody from './Dashboard/CardBody.jsx';
import CardIcon from './Dashboard/CardIcon.jsx';
import CardHeader from './Dashboard/CardHeader.jsx';
import Card from './Dashboard/Card.jsx';
import Table from './Dashboard/Table.jsx';
import GridContainer from './Dashboard/GridContainer.jsx';
import GridItem from './Dashboard/GridItem.jsx';

import ShowNotif from '../Notifications/ShowNotif';

import Notificationreport from '../Notifications/NotificationReport';
import ClassCharts from './classCharts';

class Dashboard extends React.Component {
    state = {
      value: 0
    };

    constructor(props) {
      super(props);

      this.state = {
        open: false,
        openNotif: false,
        appsAsked: [],
        expanded: null
      };

      const classesLabel = {
        1: 'Petite section',
        2: 'Moyenne Section',
        3: 'Grande section',
        4: 'CP',
        5: 'CE1',
        6: 'CE2',
        7: 'CM1',
        8: 'CM2',
        9: '6e',
        10: '5e',
        11: '4e',
        12: '3e'
      };

      this.generateAllNotif = this.generateAllNotif.bind(this);
    }

    componentWillMount() {
      const {
        getStudentsNbr, getAppsNbr, token, updateDash
      } = this.props;

      getStudentsNbr(token);
      getAppsNbr(token);
      updateDash(token);
    }

    showNotif(idNotif) {
      this.setState({ openNotif: true });

      this.props.showNotif(idNotif, this.props.token);
    }

    generateAllNotif = () => {
      const obj = this.props.content;

      const notifs = [];

      let id = null;


      if (obj != null) {
        for (let i = 0; i < this.props.nbNotifs; i++) {
          id = obj[i].idNotif;

          if (obj[i].isRead === 0) {
            notifs.push(
              <ListItem key={i} role={undefined} dense button>
                <ListItemText primary={obj[i].textNotif} />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.showNotif.bind(this, id)} aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        }
      }
      return notifs;
    }

    renderRankTab = () => {
      if (this.props.studentRank !== null && this.props.studentRank.length > 0) {
        const id = null;
        const src = null;
        let ranks = [];

        ranks = this.props.studentRank.map((rank, i) => (
          [`${rank.nomEleve.toString()} ${rank.prenomEleve.toString()}`, (Math.round(rank.score * 100) / 100).toString(), (i + 1).toString()]
        ));
        return ranks;
      }
      return ([[]]);
    }

    handleCloseDashNotifs = () => {
      this.setState({ anchorEl: null, dashBoardNotif: false });
    };

    handleCloseDashNotifsStop = () => {
      this.setState({ anchorEl: null, dashBoardNotif: false });
      this.props.stopNotif();
    };

    render() {
      const { classes } = this.props;

      return (
        <div>
          <div style={{ marginBottom: '2%' }}>
            <h2 style={{ textAlign: 'center', color: 'grey' }}>Bonjour {this.props.name} {this.props.lastname}, que voulez-vous faire aujourd'hui ?</h2>
          </div>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p className={classes.cardCategory}>Nombres d'éleves</p>
                    <h3 className={classes.cardTitle}>{this.props.nbStudents}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      <a href="/students">
                                            Accéder au trombinoscope
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Apps />
                    </CardIcon>
                    <p className={classes.cardCategory}>Applications / Jeux</p>
                    <h3 className={classes.cardTitle}>{this.props.nbGames}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      <a href="/store">
                                            Voir votre bibliothèque
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Games />
                    </CardIcon>
                    <p className={classes.cardCategory}>Parties jouées</p>
                    <h3 className={classes.cardTitle}>{this.props.gamesNbr}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                                        Ce mois-ci
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="warning">
                    <ClassCharts />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Moyenne globales de vos classes</h4>
                    <p className={classes.cardCategory}></p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Classement global de vos éleves</h4>
                    <p className={classes.cardCategoryWhite}>
                                        Classement de vos eleves pour ce trimestre.
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={['Nom', 'Score', 'Rang']}
                      tableData={this.renderRankTab()}
                    />
                  </CardBody>
                </Card>
              </GridItem>

            </GridContainer>
            <GridContainer>
              <Notificationreport size={6} />
            </GridContainer>
          </div>


          <Dialog
            open={this.props.dashBoardNotif && this.props.showDash && this.props.nbNotifs > 0}
            onClose={this.handleCloseDashNotifs}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>Vous avez des notifications</DialogTitle>
            <DialogContent>
              <List>
                {this.generateAllNotif()}
              </List>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.props.stopNotifTmp}>
                            Ok
              </Button>
              <Button color="primary" onClick={this.handleCloseDashNotifsStop}>
                            Ne plus me prévenir
              </Button>
            </DialogActions>

          </Dialog>

          <ShowNotif />

        </div>
      );
    }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  lastname: state.user.lastname,
  isDirector: state.login.director,
  token: state.login.token,
  nbStudents: state.students.nbStudents,
  typeUser: state.login.typeUser,
  idUser: state.login.id_user,
  typeNotif: state.showNotif.typeNotif,
  nbNotifs: state.notification.nbNotif,
  content: state.notification.content,
  showDash: state.showDash.showDash,
  nbGames: state.appRegistred.appsNbr,
  contentProf: state.showNotif.contentProf,
  dashBoardNotif: state.showDashTmp.showDash,
  gamesNbr: state.dashboard.GamesPlayed,
  studentRank: state.dashboard.rank,
  contentAvg: state.dashboard.classesAvg
});

const mapDispatchToProps = (dispatch) => ({
  showNotif: (idNotif, token) => dispatch({ type: 'SHOW_NOTIF_REQUEST', idNotif, token }),
  getStudentsNbr: (token) => dispatch({ type: 'GET_STUDENTSNBR_REQUEST', token }),
  getAppsNbr: (token) => dispatch({ type: 'GET_APPNBR_REQUEST', token }),
  stopNotif: () => dispatch({ type: 'NOTIFS_DASH_STOP' }),
  stopNotifTmp: () => dispatch({ type: 'SHOW_DASH_TMP_STOP' }),
  updateDash: (token) => dispatch({ type: 'GET_DASHBOARD_REQUEST', token })

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard)));
