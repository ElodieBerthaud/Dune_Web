import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import DialogContentText from '@material-ui/core/DialogContentText';
import Drawer from './Drawer';
import ShowNotif from '../Notifications/ShowNotif';
import Tutorial from '../tutorial/Tutorial';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      colorbar: '',
      open: false,
      anchorEl2: null
    };
  }

  componentWillMount() {
    this.props.getNotifs(this.props.idUser, this.props.token);
  }

    handleProfileMenuOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = (event) => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
    };

    handleAccount = () => {
      window.location = '/account';
    }

    handleLogout = () => {
      const { handleLogoutRedux } = this.props;

      handleLogoutRedux();

      window.location = '/';
    }

    handleClick = (event) => {
      this.setState({ anchorEl2: event.currentTarget, open: true });
    };

    handleClose = () => {
      this.setState({ anchorEl: null, open: false, openNotif: false });
    };

    showNotif(idNotif) {
      this.setState({ openNotif: true });
      this.setState({ open: false });

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
              <MenuItem key={i} onClick={this.showNotif.bind(this, id)}>{obj[i].textNotif}</MenuItem>
            );
          }
        }
        if (this.props.nbNotifs === 0) {
          notifs.push(
            <MenuItem key={0}>Pas de notifications.</MenuItem>
          );
        }
      }
      return notifs;
    }

    renderNotification = () => {
      const content = [];

      if (this.props.typeUser === 2) {
        content.push(<DialogContentText key={this.props.idAppNotif}>
                Vous avez une demande d'application de
          {` ${this.props.prenomProfNotif} ${this.props.nomProfNotif}`}.<br />
                    Cela concerne l'application {this.props.nomAppNotif}. {' '}
          <a target="_blank" href={`/store/${this.props.idAppNotif}`}>Cliquez ici</a>
          {' '}pour voir l'application.<br />
                    Voulez-vous accpeter cette demande ?
                     </DialogContentText>);
      } else {
        content.push(<DialogContentText>

                    Votre directeur d'etablissement a {this.props.isNotifAccepted === 0 ? ' refusé ' : ' accepté '} votre demande d'achat de l'application
          {' '} {this.props.nomAppNotif}.

                     </DialogContentText>
        );
      }
      return content;
    }

    acceptAppRequest = () => {
      this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 1, this.props.idNotif);
    }

    declineAppRequest = () => {
      this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 0, this.props.idNotif);
    }

    handleCloseNotif= () => {
      this.props.readNotif(this.props.idNotif, this.props.token);
      this.setState({ open: false });
      window.location.reload();
    }

  handleFacturation = () => {
      window.location = '/facturation';
  }

    render() {
      const { anchorEl } = this.state;

      this.state.colorbar = window.location.pathname === '/store' ? '#ab47bc' : window.location.pathname === '/abonnements' ? '#00838f' : window.location.pathname === '/facturation' ? '#e57373' : '';

      const { mobileMoreAnchorEl } = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
      const { onOpenDrawer } = this.props;

      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleAccount}>Mon compte</MenuItem>
          { this.props.director ? <MenuItem onClick={this.handleFacturation}>Facturation</MenuItem> : '' }
          <MenuItem onClick={this.handleLogout}>Se deconnecter</MenuItem>
        </Menu>
      );

      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      );

      if (this.props.logged) {
        return (
          <div className={classes.root}>
            <AppBar position="static" color={'primary'} style={{ backgroundColor: this.state.colorbar }}>
              <Toolbar>
                <IconButton onClick={onOpenDrawer} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="title" color="inherit" noWrap>
                                Dune
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    color="inherit"
                    aria-owns={this.state.open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <Badge className={classes.margin} badgeContent={this.props.nbNotifs === null ? 0 : this.props.nbNotifs} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Menu id="fade-menu" anchorEl={this.state.anchorEl2} open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade}>
                    { this.generateAllNotif() }
                  </Menu>
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
            <Drawer open={this.state.open} />

            <ShowNotif />
            <Tutorial />

          </div>
        );
      }


      return (
        <div className={classes.root}>
          <AppBar position="static" color={'primary'}>
            <Toolbar>
              <Typography className={classes.title} variant="title" color="inherit" noWrap>
                                Dune
              </Typography>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}

          <Drawer open={this.state.open} />
        </div>


      );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  opened: state.drawer.opened,
  logged: state.login.logged,
  idUser: state.login.id_user,
  token: state.login.token,
  nbNotifs: state.notification.nbNotif,
  content: state.notification.content,
  nomProfNotif: state.showNotif.nomProf,
  prenomProfNotif: state.showNotif.prenomProf,
  nomAppNotif: state.showNotif.nomApp,
  typeNotif: state.showNotif.typeNotif,
  idAppNotif: state.showNotif.idApp,
  typeUser: state.login.typeUser,
  idDemandeNotif: state.showNotif.idDemande,
  isNotifAccepted: state.showNotif.isAccepted,
  idNotif: state.showNotif.idNotif,
  director: state.login.director
});

const mapDispatchToProps = (dispatch) => ({
  onOpenDrawer: () => dispatch({ type: 'OPEN_DRAWER_REQUEST' }),
  handleLogoutRedux: () => dispatch({ type: 'USER_LOGOUT' }),
  getNotifs: (idUser, token) => dispatch({ type: 'GET_NOTIFS_REQUEST', idUser, token }),
  showNotif: (idNotif, token) => dispatch({ type: 'SHOW_NOTIF_REQUEST', idNotif, token }),
  validateApp: (typeUser, token, idDemande, validate, idNotif) => dispatch({
    type: 'VALIDATE_APP_REQUEST', typeUser, token, idDemande, validate, idNotif
  }),
  readNotif: (idNotif, token) => dispatch({ type: 'READ_NOTIF_REQUEST', idNotif, token })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
