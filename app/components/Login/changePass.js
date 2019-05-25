import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
  root: {
    flexGrow: 1,
  },
};


class ChangePass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OldPass: '',
      NewPass: '',
      NewPassConfirm: '',
      showPasswordOld: false,
      showPasswordNew: false,
      showPasswordConfirm: false
    };

    this.handleCheckPass = this.handleCheckPass.bind(this);
    this.handleChangeValues = this.handleChangeValues.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleCheckPass(evt) {
    if (this.state.OldPass === '' || this.state.NewPass === '' || this.state.NewPassConfirm === '') {
      this.props.SendAlert("Erreur. Vous n'avez pas rempli tous les champs requis.");
    } else if (this.state.OldPass === this.state.NewPass) {
      this.props.SendAlert("Erreur. Le nouveau mot de passe est identique a l'ancien.");
    } else if (this.state.NewPass !== this.state.NewPassConfirm) {
      this.props.SendAlert('Erreur. La confirmation du nouveau de passe ne correspond pas.');
    } else {
      this.props.changePass(this.props.token, this.props.idUser, this.state.OldPass, this.state.NewPass);
    }
  }

  handleChangeValues(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleChangePass(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

    handleClickShowPasswordOld = () => {
      this.setState((state) => ({ showPasswordOld: !state.showPasswordOld }));
    };

    handleClickShowPasswordNew = () => {
      this.setState((state) => ({ showPasswordNew: !state.showPasswordNew }));
    };

    handleClickShowPasswordConfirm = () => {
      this.setState((state) => ({ showPasswordConfirm: !state.showPasswordConfirm }));
    };

    render() {
      return (
        <div style={{ textAlign: 'center' }}>
          <TextField
            required
            style={{ width: '90%' }}
            onChange={this.handleChangeValues}
            label="Votre ancien mot de passe"
            placeholder="Mot de passe"
            name="OldPass"
            type={this.state.showPasswordOld ? 'text' : 'password'}
            value={this.state.OldPass}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPasswordOld}
                  >
                    {this.state.showPasswordOld ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /><br />
          <TextField
            required
            style={{ width: '90%' }}
            label="Votre nouveau mot de passe"
            onChange={this.handleChangeValues}
            placeholder="Mot de passe"
            name="NewPass"
            value={this.state.NewPass}
            type={this.state.showPasswordNew ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPasswordNew}
                  >
                    {this.state.showPasswordNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /><br />
          <TextField
            required
            style={{ width: '90%' }}
            onChange={this.handleChangeValues}
            label="Confirmation de votre nouveau mot de passe"
            name="NewPassConfirm"
            placeholder="Confirmation de votre nouveau mot de passe"
            type={this.state.showPasswordConfirm ? 'text' : 'password'}
            value={this.state.NewPassConfirm}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPasswordConfirm}
                  >
                    {this.state.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /><br />

          <Button
            onClick={this.handleCheckPass}
            variant="contained"
            color="primary"// <-- Just add me!
            // label='My Label' className={classes.button}
            style={{ backgroundColor: '#ffa726', marginTop: '5%' }}
          >
                    Valider
          </Button>
        </div>
      );
    }
}

ChangePass.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
  idUser: state.login.id_user
});

const mapDispatchToProps = (dispatch) => ({
  SendAlert: (message) => dispatch({ type: 'SNACK_PUT_ERROR', message }),
  changePass: (token, idUser, oldPassword, newPassword) => dispatch({
    type: 'CHANGE_PASS_REQUEST', token, idUser, oldPassword, newPassword
  })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChangePass)));
