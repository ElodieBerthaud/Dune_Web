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
import student from '../../images/student.png';
import ViewImage from '../Main/ViewImage';

const styles = (theme) => ({
  card: {
    margin: 0,
  },
  media: {
    height: 50,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class One_profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idStudent: null,
      nomEleve: '',
      prenomEleve: ''
    };

    this.handleChangeValues = this.handleChangeValues.bind(this);
  }

  componentDidMount() {
    this.setState({ idStudent: this.props.idEleve, nomEleve: this.props.nomEleve, prenomEleve: this.props.prenomEleve });
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.nomEleve !== nextProps.nomEleve) this.setState({ nomEleve: nextProps.nomEleve });
    if (this.props.prenomEleve !== nextProps.prenomEleve) this.setState({ prenomEleve: nextProps.prenomEleve });
    if (this.props.idEleve !== nextProps.idEleve) this.setState({ idStudent: nextProps.idEleve });
  }

    changeImage = (event) => {
      const { onPickImage } = this.props;

      const file = URL.createObjectURL(event.target.files[0]);

      const file_obj = event.target.files[0];

      onPickImage(file, file_obj);
    }


    handleChangeValues(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    handleUpdate = () => {
      this.props.updateStudentInfo(this.props.idEleve, this.state.nomEleve, this.state.prenomEleve, this.props.token);
    }

    render() {
      const { classes } = this.props;
      console.log(api_url_dev);

      return (
        <div>
          <Card className={classes.card} classes={{ root: classes.card }}>
            <div>
              <Avatar
                alt="Adelle Charles"
                src={this.props.picEleve ? 'http://' + api_url_dev + '/files/eleves/' + this.props.picEleve : student}
                className={classNames(classes.avatar, classes.bigAvatar)}
                style={{
                  margin: '2% auto', width: '15%', height: '15%', marginBottom: '0'
                }}
                type="file"
              />

            </div>
            <CardContent style={{ padding: '0', margin: '1%' }}>
              <h2 style={{ textAlign: 'center' }}>
                {this.props.nomEleve} {this.props.prenomEleve}
              </h2>
              <div style={{ textAlign: 'center' }}>
                <h3> Eleve </h3>
              </div>
            </CardContent>
            <div style={{ borderBottom: '1px solid grey', width: '40%', margin: '0 auto' }}>
            </div>
            <CardContent style={{ padding: '0', margin: '1%', textAlign: 'center' }}>
              <h2> Données personnelles </h2>
              <div style={{ textAlign: 'center' }}>
                <TextField
                  id="outlined-name"
                  margin="normal"
                  variant="outlined"
                  name="nomEleve"
                  value={this.state.nomEleve === null ? '' : this.state.nomEleve}
                  style={{ margin: '1%' }}
                  onChange={this.handleChangeValues}
                />
                <TextField
                  id="outlined-name"
                  margin="normal"
                  variant="outlined"
                  name="prenomEleve"
                  value={this.state.prenomEleve === null ? '' : this.state.prenomEleve}
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
                            Modifier les informations
              </Button>
            </CardContent>
          </Card>
          <ViewImage student />
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  nomEleve: state.studentProfile.nomEleve,
  prenomEleve: state.studentProfile.prenomEleve,
  idEleve: state.studentProfile.idEleve,
  picEleve: state.studentProfile.picEleve
});

const mapDispatchToProps = (dispatch) => ({
  getStudentInfo: (id, token) => dispatch({ type: 'STUDENT_PROFILE_REQUEST', id, token }),
  onPickImage: (file, file_obj) => dispatch({ type: 'GET_IMG_REQUEST', file, file_obj }),
  updateStudentInfo: (id, nom, prenom, token) => dispatch({
    type: 'UPDATE_STUDENT', id, nom, prenom, token
  })
});


One_profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(One_profile));
