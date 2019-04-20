import React, { Component } from 'react';
import "../css/Login.css";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dashboardStyle from "./Dashboard/styles/dashboardStyle.jsx";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Test from "./test";

function getSteps() {
    return ['Type de media', 'Nommer le document', 'Choix du document', 'Description du document'];
}

class AddCourseFile extends Component{

    state = {
        activeStep: 0,
        cath: 0,
        idCath: 0,
        nomFicher: '',
        shareFile: false,
        descFichier: '',
        file: null,
        urlPDF: null,
        openPDF: false,
        fileName: ''
    }

    constructor(props){
        super(props);
    }

    isStepOptional = step => {
        return step === 1;
    };

    handleChange = event => {

        if (event.target.name === 'file' && event.target.value !== null){

            const file = URL.createObjectURL(event.target.files[0]);

            const file_obj = event.target.files[0];

            this.setState({openPDF: true, urlPDF: file_obj, fileName: file_obj.name, file: file_obj});
        }else{
            this.setState({ [event.target.name]: event.target.value });
        }

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

            if (this.state.nomFicher === null){
                this.props.SendAlert('Veuillez choisir un nom de fichier avant de continuer.');

            }else {
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));
            }

        }
        else if (this.state.activeStep === 2){

            if (this.state.file === null){
                this.props.SendAlert('Veuillez choisir un fichier avant de continuer.');

            }else {
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));
            }

        }
        else if (this.state.activeStep === 3){

            if (this.state.descFichier === ''){
                this.props.SendAlert('Veuillez remplir une description avant de continuer.');
            }else{

                console.log(this.state.cath);
                console.log(this.state.nomFicher);
                console.log(this.state.shareFile);
                console.log(this.state.file);
                console.log(this.state.descFichier);

                this.props.AddFile(this.props.token, this.state.nomFicher === '' ? this.state.fileName : this.state.nomFicher, this.state.descFichier, this.state.shareFile, this.state.file, this.state.cath);

            }

        }
        else if (this.state.activeStep === 4){




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
                                    <em>Choisissez une catégorie</em>
                                </MenuItem>
                                <MenuItem value={"IMG"}>Image</MenuItem>
                                <MenuItem value={"MP4"}>Video</MenuItem>
                                <MenuItem value={"PDF"}>PDF</MenuItem>
                            </Select>
                    </FormControl>
                </div>;
            case 1:
                return <div> <p> Remplissez les champs ci-dessous (20 caractères maximum)</p>
                    <FormControl  className={classes.formControl} style={{margin: '3%'}}>
                        <TextField
                            name="nomFicher"
                            style={{width:'100%'}}
                            label="Nom"
                            placeholder="Nom"
                            value={this.state.nomFicher}
                            onChange={this.handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
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
                                <Tooltip title={this.state.fileName !== '' ? this.state.fileName : 'Aucun fichier choisi'} placement="top">

                                    <Button
                                        style={{margin: '0 auto'}}
                                        variant="contained" color="primary" // <-- Just add me!
                                        label='My Label' className={classes.button}>
                                        <input type="file" name='file' style={{position: 'absolute', opacity: '0'}} onChange={this.handleChange}/>
                                        Choisir un fichier
                                    </Button>
                                </Tooltip>
                            }
                        />

                        <FormControlLabel
                            control={
                                <Tooltip title="Partager a toute l'ecole" placement="top">
                                    <Checkbox
                                        checked={this.state.shareFile}
                                        onChange={this.handleChangeFileChecked}
                                        name="shareFile"
                                        color="primary"
                                        value="Share"
                                    />
                                </Tooltip>

                            }
                        label="Partager"
                        />
                    </FormGroup>
                </div>;
            case 3:
                return <div> <p> Veuillez remplir une description pour ce document. </p>
                    <FormControl  className={classes.formControl} style={{margin: '3%', width: '70%'}}>
                        <TextField
                            id="outlined-textarea"
                            label="Description du fichier"
                            placeholder="Description"
                            name="descFichier"
                            onChange={this.handleChange}
                            value={this.state.descFichier}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </FormControl>
                </div>
                    ;
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

                {this.state.openPDF === true && this.state.cath === "PDF" ?

                    <Test mode={"apercu"} open={this.state.openPDF} url={this.state.urlPDF}/>

                    : ''

                }

            </div>
        );
    }

}

AddCourseFile.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        token: state.login.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
            SendAlert: (message) => dispatch({ type: "SNACK_PUT_ERROR", message }),
            AddFile: (token, fileName, description, share, fileUser, fileType) => dispatch({type: "UPLOAD_FILE_REQUEST", token, fileName, description, share, fileUser, fileType})
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AddCourseFile)));