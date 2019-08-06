import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import student from '../../images/student.png';
import dashboardStyle from '../Dash/Dashboard/styles/dashboardStyle';

const styles = (theme) => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

function getSteps() {
  return ['Choisissez la classe', 'Remplissez les informations', 'Ajoutez une photo'];
}


class AddStudent extends React.Component {
    state = {
      activeStep: 0,
      classeName: 0,
      Classe: '',
      classesLabel: null,
      nomEleve: '',
      prenomEleve: '',
      prevImage: false,
      picElevePrev: null,
      picEleveSend: null,
      picEleveMini: null,
      idClasse: null
    };

    constructor(props) {
      super(props);

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

      this.state.classesLabel = classesLabel;
    }

    componentWillMount() {
      const { token } = this.props;

      this.props.getClasses(token, this.props.typeUser, this.props.idUser);
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    changeImage = (event) => {
      this.setState({ prevImage: true });

      const file = URL.createObjectURL(event.target.files[0]);

      this.setState({ picElevePrev: file });

      this.state.picEleveSend = event.target.files[0];
    }

    getStepContent = (step, classes) => {
      switch (step) {
        case 0:
          return (
            <div> <p> Choisissez la classe dans laquelle vous voulez ajouter un eleve.</p>
              <FormControl className={classes.formControl} style={{ margin: '4%' }}>
                <InputLabel htmlFor="age-simple">Classes</InputLabel>
                <Select
                  value={this.state.classeName}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'classeName',
                    id: 'classe-simple',
                  }}
                >
                  {this.renderClasses()}
                </Select>
              </FormControl>
            </div>
          );
        case 1:
          return (
            <div> <p> Remplissez les champs ci-dessous </p>
              <FormControl className={classes.formControl} style={{ margin: '3%' }}>
                <TextField
                  required
                  name="nomEleve"
                  style={{ width: '100%' }}
                  label="Nom"
                  placeholder="Nom"
                  value={this.state.nomEleve}
                  onChange={this.handleChange}
                  error={this.state.emptylastname}
                  helperText={this.state.emptylastname ? this.state.mandatory : ''}
                /><br />
                <TextField
                  required
                  name="prenomEleve"
                  style={{ width: '100%' }}
                  label="Prénom"
                  placeholder="Prénom"
                  value={this.state.prenomEleve}
                  onChange={this.handleChange}
                  error={this.state.emptysurname}
                  helperText={this.state.emptysurname ? this.state.mandatory : ''}
                /><br />
              </FormControl>
            </div>
          );
        case 2:
          return (
            <div> <p> Vous pouvez ajouter une photo au profil. Cela n'est pas obligatoire mais fortement consseille pour la gestion de votre espace. </p>
              <FormControl className={classes.formControl} style={{ margin: '3%' }}>
                <Avatar
                  alt="Adelle Charles"
                  src={this.state.picEleveMini ? this.state.picElevePrev : student}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                  type="file"
                  style={{ width: '20%', height: '20%', margin: '1% auto' }}
                />
                <Button
                  style={{ width: '50%', margin: '0 auto' }}
                  variant="contained"
                  color="primary" // <-- Just add me!
                  label="My Label"
                  className={classes.button}
                >
                  <input type="file" name="pic" style={{ position: 'absolute', opacity: '0' }} onChange={this.changeImage} />
                                changer la photo
                </Button>
              </FormControl>
            </div>
          );
        default:
          return 'Unknown step';
      }
    }

    renderClasses = () => {
      const { classesS } = this.props;

      const classes = [];

      let i = 0;

      classes.push(
        <MenuItem id={0} key={i} value={0} disabeled="true">Choisissez une classe</MenuItem>
      );

      for (const data in classesS) {
        classes.push(
          <MenuItem id={classesS[data].idClasse} key={`${classesS[data].idClasse}-${i}`} value={classesS[data].idClasse}>{`${this.state.classesLabel[classesS[data].level]}-${classesS[data].num}`}</MenuItem>
        );
        i++;
      }
      return classes;
    }


    isStepOptional = (step) => step === 2;

    handleNext = () => {
      if (this.state.activeStep === 0) {
        if (this.state.classeName === 0) {
          this.props.SendAlert('Veuillez selectionner une classe avant de continuer.');
        } else {
          const elem = document.getElementsByName('classeName');
          const id = elem[0].getAttribute('id');
          this.setState({ idClasse: id });
          this.setState((state) => ({
            activeStep: state.activeStep + 1,
          }));
        }
      } else if (this.state.activeStep === 1) {
        if (this.state.nomEleve === '' || this.state.prenomEleve === '') {
          this.props.SendAlert('Veuillez remplir tous les champs avant de continuer.');
        } else {
          this.setState((state) => ({
            activeStep: state.activeStep + 1,
          }));
        }
      } else if (this.state.activeStep === 2) {
        this.props.addStudent(this.props.token, this.props.idUser, this.state.classeName, this.state.nomEleve, this.state.prenomEleve, this.state.picEleveSend);
      }
    };

    handleBack = () => {
      this.setState((state) => ({
        activeStep: state.activeStep - 1,
      }));
    };

    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    handleSelect = () => {
      this.setState({ prevImage: false });

      this.setState({ picEleveMini: this.state.picElevePrev });
    }

    handleCancel = () => {
      this.setState({ prevImage: false });
    }

    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;

      return (
        <div className={classes.root}>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optionnel</Typography>;
              }
              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  <StepContent>
                    {this.getStepContent(index, classes)}
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                                                Precedent
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Termine' : 'Suivant'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                            Reset
              </Button>
            </Paper>
          )}
          <Dialog
            open={this.state.prevImage}
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>Votre photo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <img style={{ width: '100%', height: '100%' }} src={this.state.picElevePrev} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleSelect}>
                            Choisir
              </Button>
              <Button color="primary" onClick={this.handleCancel}>
                            Annuler
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      );
    }
}

AddStudent.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = (state) => ({
  students: state.students.content,
  asking: state.students.asking,
  token: state.login.token,
  typeUser: state.login.typeUser,
  idUser: state.login.id_user,
  classesS: state.classes.classes
});

const mapDispatchToProps = (dispatch) => ({
  SendAlert: (message) => dispatch({ type: 'SNACK_PUT_ERROR', message }),
  getClasses: (token, typeUser, idUser) => dispatch({
    type: 'GET_CLASSES_REQUEST', token, typeUser, idUser
  }),
  addStudent: (token, directorId, idClasse, nom, prenom, picEleve) => dispatch({
    type: 'ADD_ELEVE_REQUEST', token, directorId, idClasse, nom, prenom, picEleve
  }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AddStudent)));
