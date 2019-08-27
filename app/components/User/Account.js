import React, { Component } from 'react';
import '../../styles/Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import avatar from '../../images/avatar.png';
import ViewImage from '../Main/ViewImage';
import ChangePassword from '../Login/changePassword';

const styles = (theme) => ({
  card: {
    margin: 0,
    backgroundColor: ''
  },
  media: {
    height: 50,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      name: null,
      lastName: null,
      email: null,
      openChangeModal: false
    };

    this.changeImage = this.changeImage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChangeValues = this.handleChangeValues.bind(this);
    this.changeIdent = this.changeIdent.bind(this);

    this.state.name = this.props.userName;
    this.state.lastName = this.props.userLastname;
    this.state.email = this.props.email;
  }

  changeImage(event) {
    const {
      onPickImage, email, token, idProf
    } = this.props;

    const file = URL.createObjectURL(event.target.files[0]);

    const file_obj = event.target.files[0];

    onPickImage(file, idProf, email, token, file_obj);
  }

  handleUpdate() {
    const { token, idProf, ChangeUserInfos } = this.props;

    ChangeUserInfos(this.state.name, this.state.lastName, this.state.email, idProf, token);
  }

  handleChangeValues(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  changeIdent() {
    this.setState({ openChangeModal: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card} classes={{ root: classes.card }}>
          <div>
            <Avatar
              src={this.props.image === null ? avatar : api_url_dev + `/files/profs/${this.props.image}`}
              className={classNames(classes.avatar, classes.bigAvatar)}
              style={{
                margin: '2% auto', width: '15%', height: '15%', marginBottom: '0'
              }}
              type="file"
            />

          </div>
          <CardContent style={{ padding: '0', margin: '1%' }}>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary" // <-- Just add me!
                label="My Label"
                className={classes.button}
              >
                <input type="file" name="pic" style={{ position: 'absolute', opacity: '0' }} onChange={this.changeImage} />
                                changer ma photo
              </Button>
            </div>
            <h2 style={{ textAlign: 'center' }}>
              {this.props.userName} {this.props.userLastname}
            </h2>
            <div style={{ textAlign: 'center' }}>
              <h3> {this.props.director === true ? 'Directeur d\'établissement' : 'Professeur' } </h3>
            </div>
          </CardContent>
          <div style={{ borderBottom: '1px solid grey', width: '40%', margin: '0 auto' }}>
          </div>
          <CardContent style={{ padding: '0', margin: '1%', textAlign: 'center' }}>
            <h2> Vos données personnelles </h2>
            <div style={{ textAlign: 'center' }}>
              <TextField
                id="outlined-name"
                label="Nom"
                margin="normal"
                variant="outlined"
                name="lastName"
                value={this.state.lastName}
                style={{ margin: '1%' }}
                onChange={this.handleChangeValues}
              />
              <TextField
                id="outlined-name"
                label="Prenom"
                margin="normal"
                variant="outlined"
                name="name"
                value={this.state.name}
                style={{ margin: '1%' }}
                onChange={this.handleChangeValues}
              />
            </div>
            <Button
              variant="contained"
              color="primary" // <-- Just add me!
              label="My Label"
              className={classes.button}
              onClick={this.handleUpdate}
            >
                            Modifier mes informations
            </Button>
            <br />
            <Button
              onClick={this.changeIdent}
              variant="contained"
              color="primary"// <-- Just add me!
              // label='My Label' className={classes.button}
              style={{ backgroundColor: '#ffa726' }}
            >
                            Modifier identifiant/mot de passe
            </Button>
            <ChangePassword open={this.state.openChangeModal} />
            <br />
            {this.props.director ? <Button
                variant="contained"
                color="primary"// <-- Just add me!
                style={{ backgroundColor: '#ffa726' }}
            >
              Informations bancaires de l'école
            </Button> : ''}

          </CardContent>
        </Card>
        <ViewImage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userLastname: state.user.lastname,
  email: state.user.email,
  canceled: state.uploadimg.canceled,
  director: state.login.director,
  idProf: state.login.id_user,
  token: state.login.token,
  selected: state.uploadimg.selected,
  image: state.user.pic
});

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPickImage: (file, idProf, email, token, file_obj) => dispatch({
    type: 'GET_IMG_REQUEST', file, idProf, email, token, file_obj
  }),
  ChangeUserInfos: (prenomProf, nomProf, emailProf, idProf, token) => dispatch({
    type: 'UPDATE_PROF_REQUEST', prenomProf, nomProf, emailProf, idProf, token
  }),
  passOpen: () => dispatch({ type: 'PASS_POPUP_OPEN' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));
