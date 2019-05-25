import React, { Component } from 'react';
import '../../styles/Login.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dashboardStyle from '../Dash/Dashboard/styles/dashboardStyle.jsx';

class showNotif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null
    };
  }

    handleChange = (panel) => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };

    acceptAppRequest = () => {
      this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 1, this.props.idNotif);
    }

    declineAppRequest = () => {
      this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 0, this.props.idNotif);
    }

    handleClose = () => {
      this.setState({ anchorEl: null, open: false, openNotif: false });
    };

    renderProfNotifs = () => {
      const content = [];

      if (this.props.contentProf !== null) {
        for (let i = 0; i < this.props.contentProf.length; i++) {
          content.push(<ListItem key={this.props.contentProf[i].idUser}>
            <ListItemAvatar>
              <Avatar alt="Laurine Fourcade" src={`http://176.31.252.134:9001/files/profs/${this.props.contentProf[i].picPath}`} />
            </ListItemAvatar>
            <ListItemText
              primary={this.props.contentProf[i].nomPrenom}
              secondary={(
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                                    Professeur
                  </Typography>
                  {this.props.contentProf[i].commentaire}
                </React.Fragment>
              )}
            />
                       </ListItem>);
        }

        return content;
      }
    }

    renderNotification = () => {
      const content = [];

      if (this.props.typeUser === 2 && this.props.contentProf !== null) {
        content.push(<div key={1}>
          <DialogContentText key={this.props.idAppNotif}>
                        Vous avez une demande d'application.
                        Cela concerne l'application {this.props.nomAppNotif}. {' '}
            <a target="_blank" href={`/store/${this.props.idAppNotif}`}>Cliquez ici</a>
            {' '}pour voir l'application.<br /><br />
                        Voulez-vous accepter cette demande ?
            <br /><br />
          </DialogContentText>
          <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')} style={{ overflow: 'hidden' }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Qui a demande cette application ? ( {this.props.contentProf !== null ? this.props.contentProf.length : '' } personne(s) )</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {this.renderProfNotifs()}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
                     </div>
        );
      } else {
        content.push(<DialogContentText key={1}>

                    Votre directeur d'etablissement a {this.props.isNotifAccepted === 0 ? ' refusé ' : ' accepté '} votre demande d'achat de l'application
          {' '} {this.props.nomAppNotif}.

                     </DialogContentText>
        );
      }
      return content;
    }

    handleCloseNotif= () => {
      this.props.readNotif(this.props.idNotif, this.props.token);
      window.location.reload();
    }

    resetNotif = () => {
      this.props.resetNotif();
    }

    render() {
      return (
        <Dialog
          open={this.props.openNotif}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div>
            <DialogTitle id="form-dialog-title">{this.props.typeNotif === 1 ? "Demande d'achat d'application." : "Votre demande d'application"}</DialogTitle>
            <DialogContent>
              {this.renderNotification()}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.acceptAppRequest} color="primary" style={{ display: this.props.typeUser === 1 ? 'none' : '' }}>
                            Oui
              </Button>
              <Button onClick={this.declineAppRequest} color="primary" style={{ display: this.props.typeUser === 1 ? 'none' : '' }}>
                            Non
              </Button>
              <Button onClick={this.resetNotif} color="primary" style={{ display: this.props.typeUser === 1 ? 'none' : '' }}>
                            Plus tard
              </Button>
              <Button onClick={this.handleCloseNotif} color="primary" style={{ display: this.props.typeUser === 2 ? 'none' : '' }}>
                            Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      );
    }
}


showNotif.propTypes = {
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
  nomProfNotif: state.showNotif.nomProf,
  prenomProfNotif: state.showNotif.prenomProf,
  imgAppNotif: state.showNotif.imgApp,
  nomAppNotif: state.showNotif.nomApp,
  idAppNotif: state.showNotif.idApp,
  idDemandeNotif: state.showNotif.idDemande,
  idNotif: state.showNotif.idNotif,
  showDash: state.showDash.showDash,
  nbGames: state.appRegistred.appsNbr,
  contentProf: state.showNotif.contentProf,
  openNotif: state.showNotif.show
});

const mapDispatchToProps = (dispatch) => ({
  showNotif: (idNotif, token) => dispatch({ type: 'SHOW_NOTIF_REQUEST', idNotif, token }),
  getStudentsNbr: (token) => dispatch({ type: 'GET_STUDENTSNBR_REQUEST', token }),
  getAppsNbr: (token) => dispatch({ type: 'GET_APPNBR_REQUEST', token }),
  validateApp: (typeUser, token, idDemande, validate, idNotif) => dispatch({
    type: 'VALIDATE_APP_REQUEST', typeUser, token, idDemande, validate, idNotif
  }),
  readNotif: (idNotif, token) => dispatch({ type: 'READ_NOTIF_REQUEST', idNotif, token }),
  stopNotif: () => dispatch({ type: 'NOTIFS_DASH_STOP' }),
  resetNotif: () => dispatch({ type: 'SHOW_NOTIF_RESET' })

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(showNotif)));
