import React, { Component } from 'react';
import "../css/Login.css";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dashboardStyle from "./Dashboard/styles/dashboardStyle";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import student from "../images/student.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function getSteps() {
    return ['Type de media', 'Nommer le document', 'Choix du document'];
}

class AddCourseFile extends Component{

    state = {
        activeStep: 0,
        cath: 0,
        idCath: 0,
        nomFicher: '',
        shareFile: false
    }

    constructor(props){
        super(props);
    }

    isStepOptional = step => {
        return step === 1;
    };

    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeFileChecked = event => {

        this.setState({ [event.target.name]: !this.state.shareFile });
    };

    handleNext = () => {

        if (this.state.activeStep === 0){
            if (this.state.cath === 0){
                this.props.SendAlert('Veuillez selectionner une cathegorie avant de continuer.');
            }else {
                var elem = document.getElementsByName( 'cath' );
                var id = elem[0].getAttribute( 'id' );
                this.setState({idCath: id});
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));
            }
        }
        else if (this.state.activeStep === 1){

            if (this.state.nomEleve === '' || this.state.prenomEleve === ''){
                this.props.SendAlert('Veuillez remplir tous les champs avant de continuer.')
            }else{

                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));

            }

        }
        else if (this.state.activeStep === 2){

            console.log(this.state.cath);
            console.log(this.state.nomFicher);
            console.log(this.state.shareFile);

            //this.props.addStudent(this.props.token, this.props.idUser, this.state.classeName, this.state.nomEleve, this.state.prenomEleve, this.state.picEleveSend);

        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };


    getStepContent = (step, classes) => {
        switch (step) {
            case 0:
                return <div> <p> Choisissez la categorie de media que vous allez ajouter.</p>
                    <FormControl className={classes.formControl} style={{margin: '4%'}}>
                        <InputLabel htmlFor="age-simple">Cathegories</InputLabel>
                            <Select
                                value={this.state.cath}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'cath',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value={0}>
                                    <em>Choisissez une cathegorie</em>
                                </MenuItem>
                                <MenuItem value={1}>Image</MenuItem>
                                <MenuItem value={2}>Video</MenuItem>
                                <MenuItem value={3}>PDF</MenuItem>
                            </Select>
                    </FormControl>
                </div>;
            case 1:
                return <div> <p> Remplissez les champs ci-dessous </p>
                    <FormControl  className={classes.formControl} style={{margin: '3%'}}>
                        <TextField
                            name="nomFicher"
                            style={{width:'100%'}}
                            label="Nom"
                            placeholder="Nom"
                            value={this.state.nomEleve}
                            onChange={this.handleChange}
                        /><br />
                    </FormControl>
                </div>
                    ;
            case 2:
                return <div>
                    <p>
                        Choisissez le fichier que vous voulez ajouter a votre espace. Vous pouvez choisir de le rendre accessible par tout le monde en cochant la case "Partager".</p>
                    <FormGroup row style={{margin: '5%'}}>
                        <FormControlLabel
                            control={
                                <Button
                                    style={{margin: '0 auto'}}
                                    variant="contained" color="primary" // <-- Just add me!
                                    label='My Label' className={classes.button}>
                                    <input type="file" name='file' style={{position: 'absolute', opacity: '0'}}/>
                                    Choisir un fichier
                                </Button>
                            }
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.shareFile}
                                    onChange={this.handleChangeFileChecked}
                                    name="shareFile"
                                    color="primary"
                                    value="Share"
                                />
                        }
                        label="Partager"
                        />
                    </FormGroup>
                </div>;
            default:
                return 'Unknown step';
        }
    }

    render(){

        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return(
            <div>
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
                                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }

}

AddCourseFile.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SendAlert: (message) => dispatch({ type: "SNACK_PUT_ERROR", message })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AddCourseFile)));