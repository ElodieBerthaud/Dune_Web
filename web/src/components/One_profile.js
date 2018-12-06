import React, { Component } from 'react';
import "../css/Login.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import student from "../images/student.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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

class One_profile extends Component{

    constructor (props){
        super(props);

        this.state = {
            idStudent: null,
            nomEleve: "",
            prenomEleve: ""
        }

        this.state.idStudent = this.props.id;
    }

    render(){

        const { classes } = this.props;

        this.state.nomEleve = this.props.nomEleve != null ? this.props.nomEleve : '';
        this.state.prenomEleve = this.props.prenomEleve != null ? this.props.prenomEleve : '';

        return(
            <div>
                <Card className={classes.card} classes={{root: classes.card}}>
                    <div>
                        <Avatar
                            alt="Adelle Charles"
                            src={this.props.selected ? this.props.image : student}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            style={{margin: '2% auto', width: '15%', height: '15%', marginBottom: '0'}}
                            type='file'
                        />

                    </div>
                    <CardContent style={{padding: '0', margin:'1%'}}>
                        <div style={{textAlign: 'center'}}>
                            <Button  variant="contained" color="primary" // <-- Just add me!
                                     label='My Label' className={classes.button}>
                                <input type="file" name='pic' style={{position: 'absolute', opacity: '0'}}/>
                                changer la photo
                            </Button>
                        </div>
                        <h2 style={{textAlign: 'center'}}>
                            {this.props.nomEleve} {this.props.prenomEleve}
                        </h2>
                        <div style={{textAlign: 'center'}}>
                            <h3> Eleve </h3>
                        </div>
                    </CardContent>
                    <div style={{borderBottom: '1px solid grey', width: '40%', margin:'0 auto'}}>
                    </div>
                    <CardContent style={{padding: '0', margin: '1%', textAlign: 'center'}}>
                        <h2> Données personnelles </h2>
                        <div style={{textAlign: 'center'}}>
                            <TextField
                                id="outlined-name"
                                label="Nom"
                                margin="normal"
                                variant="outlined"
                                name='lastName'
                                value={this.state.nomEleve}
                                style={{margin: '1%'}}
                                onChange={this.handleChangeValues}
                            />
                            <TextField
                                id="outlined-name"
                                label="Prenom"
                                margin="normal"
                                variant="outlined"
                                name='name'
                                value={this.state.prenomEleve}
                                style={{margin: '1%'}}
                                onChange={this.handleChangeValues}
                            />
                        </div>
                        <Button  variant="contained" color="primary" // <-- Just add me!
                                 label='My Label' className={classes.button} onClick={this.handleUpdate}>
                            Modifier les informations
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        nomEleve: state.studentProfile.nomEleve,
        prenomEleve: state.studentProfile.prenomEleve,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStudentInfo: (id, token) => dispatch({ type: "STUDENT_PROFILE_REQUEST", id, token })
    };
};



One_profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(One_profile));