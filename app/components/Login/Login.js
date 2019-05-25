import React, { Component } from 'react';
import '../../styles/Login.css';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';


const emailRegex = require('email-regex');


const styles2 = (theme) => ({
  margin: {
    margin: theme.spacing.unit,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      email: '',
      password: '',
      showPassword: false
    };

    this.handleCheckFormForgot = this.handleCheckFormForgot.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeForgot = this.handleChangeForgot.bind(this);
    this.handleCheckFormConnect = this.handleCheckFormConnect.bind(this);
    this.checkEmailForgot = this.checkEmailForgot.bind(this);
  }

    handleClickShowPassword = () => {
      this.setState((state) => ({ showPassword: !state.showPassword }));
    };

    handleClickOpen() {
      this.setState({ open: true });
    }

    handleClose() {
      this.setState({ open: false });
      this.setState({ loader: false });
    }

    handleCheckFormForgot() {
      const { onClickChangePass } = this.props;
      if (!emailRegex({ exact: true }).test(this.state.emailforgot)) {
        this.setState({ emptyforgotemail: true });
      } else {
        this.setState({ loader: true });
        onClickChangePass(this.state.emailforgot);
      }
    }

    handleCheckFormConnect(e) {
      e.preventDefault();

      this.props.onClickConnect(this.state.email, this.state.password);
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeForgot(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      !emailRegex({ exact: true }).test(this.state.emailforgot) ? this.setState({ emptyforgotemail: true }) : this.setState({ emptyforgotemail: false });
    }

    checkEmailForgot() {
      return (emailRegex({ exact: true }).test(this.state.emailforgot));
    }

    render() {
      const { passpending, passsuccess, classes } = this.props;

      document.body.style.backgroundImage = 'url(http://t.wallpaperweb.org/wallpaper/nature/1440x1080/1733_desert_1440x1080.jpg)';
      document.body.style.backgroundSize = 'cover';

      return (

      /*
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={passpending ? {textAlign:'center', margin: '10%'} : {display:'none'}}>
                        <img src={loader} style={{display: 'inherit', margin: '0 auto'}} alt={'loader'}/>
                        Veulliez patienter, votre mail est en cours d'envoi...
                    </div>
                    <div style={passsuccess || passpending ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">Mot de passe oublié</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Vous avez égaré votre mot de passe. Pour en recevoir un nouveau, veuillez renseignez votre adresse Email.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="emailforgot"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={this.state.emailForgot}
                                fullWidth
                                error={this.state.emptyforgotemail}
                                onChange={this.handleChangeForgot}
                                helperText={!this.checkEmailForgot() ? 'Email invalide.' : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.handleCheckFormForgot} color="primary">
                                Recevoir mon nouveau mot de passe
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
*/

        <div className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                        Connection
            </Typography>
            <form className={classes.form} onSubmit={this.handleCheckFormConnect}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )}
                />
              </FormControl>
              <a onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>Mot de passe oublié ? </a>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                            Se connecter
              </Button>
            </form>
          </Paper>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <div style={passsuccess || passpending ? { display: 'none' } : { display: '' }}>
              <DialogTitle id="form-dialog-title">Mot de passe oublié</DialogTitle>
              <DialogContent>
                <DialogContentText>
                                    Vous avez égaré votre mot de passe. Pour en recevoir un nouveau, veuillez renseignez votre adresse Email.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="emailforgot"
                  id="name"
                  label="Email Address"
                  type="email"
                  value={this.state.emailForgot}
                  fullWidth
                  error={this.state.emptyforgotemail}
                  onChange={this.handleChangeForgot}
                  helperText={!this.checkEmailForgot() ? 'Email invalide.' : ''}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                                    Annuler
                </Button>
                <Button onClick={this.handleCheckFormForgot} color="primary">
                                    Recevoir mon nouveau mot de passe
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      );
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  logged: state.login.logged,
  id_user: state.login.id_user,
  passpending: state.password.asking,
  passsuccess: state.password.success,
  passerroor: state.password.error
});

const mapDispatchToProps = (dispatch) => ({
  onClickConnect: (email, pass) => dispatch({ type: 'LOGIN_REQUEST', email, pass }),
  onClickChangePass: (email) => dispatch({ type: 'CHANGE_PASSWORD_REQUEST', email })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(Login)));
