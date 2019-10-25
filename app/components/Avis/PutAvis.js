import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none',
  }

});

class PutAvis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 5,
      multiline: ''
    };
  }

  componentWillMount() {
    this.props.getUserAvis(this.props.id, this.props.token);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {

    if (nextProps.note !== this.props.note && nextProps.commentaire !== this.props.commentaire) {
        this.setState({rate: nextProps.note})
        this.setState({multiline: nextProps.commentaire})
    }

  }

  changeRate = (event) => {
      //const rate = document.getElementsByClassName('react-rater-star is-active')[0].style;

      this.state.rate = event.rating;
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    sendAvis = () => {
    if (this.props.avis){
      this.props.UpdateAvis(this.props.id, this.state.rate, this.state.multiline, this.props.token);
    } else {
      this.props.AddAvis(this.props.id, this.state.rate, this.state.multiline, this.props.token);
    }

      this.setState({ multiline: '', rate: 5 });
    }

    render() {
      const classes = this.props;
      return (
        <div>

          <h2 style={{ textAlign: 'center' }}>Qu'avez-vous pensé de cette application ? </h2>

          <form className={classes.container} noValidate autoComplete="off">

            <Rater
              onRate={this.changeRate}
              total={5}
              rating={this.state.rate}
              interactive
              style={{ fontSize: '2em', textAlign: 'center' }}
            />


            <TextField
              id="outlined-multiline-flexible"
              label="Votre commentaire"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="multiline"
              fullWidth
              rows={6}
            />

            <div style={{ textAlign: 'center' }}>

              <Button variant="contained" color="primary" className={classes.button} onClick={this.sendAvis}>
                            Envoyer le commentaire
              </Button>

            </div>

          </form>

        </div>
      );
    }
}

PutAvis.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
  id: state.appPage.appContent.id,
  note: state.userAvis.note,
  commentaire: state.userAvis.commentaire,
  avis: state.userAvis.avis
});

const mapDispatchToProps = (dispatch) => ({
  AddAvis: (idGame, note, commentaire, token) => dispatch({
    type: 'ADD_AVIS_REQUEST', idGame, note, commentaire, token
  }),
  UpdateAvis: (idGame, note, commentaire, token) => dispatch({
    type: 'UPDATE_AVIS_REQUEST', idGame, note, commentaire, token
  }),
  getUserAvis: (idGame, token) => dispatch({type: 'GET_USER_AVIS', idGame, token})
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PutAvis)));
