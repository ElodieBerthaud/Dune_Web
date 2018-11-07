import React, { Component } from 'react';
import "../css/Login.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import avatar from "../images/avatar.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ViewImage from './ViewImage';

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

class Account extends Component{

    constructor(props) {

        super(props);

        this.state = {
            file: null,
            name: null,
            lastName: null,
            email: null
        }

        this.changeImage = this.changeImage.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChangeValues = this.handleChangeValues.bind(this);

        this.state.name = this.props.userName;
        this.state.lastName = this.props.userLastname;
        this.state.email = this.props.email;
    }

    changeImage(event){

        const { onPickImage } = this.props;

        const file = URL.createObjectURL(event.target.files[0]);

        onPickImage(file);
    }

    handleUpdate(){

        console.log("HANDLE UPDATE");

        const { token, idProf, ChangeUserInfos } = this.props;

        console.log("ID ===== " + idProf);


        ChangeUserInfos(this.state.name, this.state.lastName, this.state.email, idProf, token);
    }

    handleChangeValues(evt){
        this.setState({[evt.target.name]: evt.target.value});

        console.log(this.state.lastName);
        console.log(evt.target.value);
    }

    render(){

        const { classes } = this.props;

        return(
            <div>
                <Card className={classes.card} classes={{root: classes.card}}>
                    <div>
                        <Avatar
                            alt="Adelle Charles"
                            src={avatar}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            style={{margin: '2% auto', width: '15%', height: '15%', marginBottom: '0'}}
                            type='file'
                        />

                    </div>
                    <CardContent style={{padding: '0', margin:'1%'}}>
                        <div style={{textAlign: 'center'}}>
                            <Button  variant="contained" color="primary" // <-- Just add me!
                                    label='My Label' className={classes.button}>
                                <input type="file" style={{position: 'absolute', opacity: '0'}} onChange={this.changeImage}/>
                                changer ma photo
                            </Button>
                        </div>
                        <h2 style={{textAlign: 'center'}}>
                            {this.props.userName} {this.props.userLastname}
                        </h2>
                        <div style={{textAlign: 'center'}}>
                            <h3> {this.props.director === true ? 'Directeur d\'établissement' : 'Professeur' } </h3>
                        </div>
                    </CardContent>
                <div style={{borderBottom: '1px solid grey', width: '40%', margin:'0 auto'}}>
                </div>
                <CardContent style={{padding: '0', margin: '1%', textAlign: 'center'}}>
                    <h2> Vos données personnelles </h2>
                    <div style={{textAlign: 'center'}}>
                        <TextField
                            id="outlined-name"
                            label="Nom"
                            margin="normal"
                            variant="outlined"
                            name='lastName'
                            value={this.state.lastName}
                            style={{margin: '1%'}}
                            onChange={this.handleChangeValues}
                        />
                        <TextField
                            id="outlined-name"
                            label="Prenom"
                            margin="normal"
                            variant="outlined"
                            name='name'
                            value={this.state.name}
                            style={{margin: '1%'}}
                            onChange={this.handleChangeValues}
                        />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <TextField
                            id="outlined-name"
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            name='email'
                            value={this.state.email}
                            style={{margin: '1%', width: '30%'}}
                            onChange={this.handleChangeValues}
                        />
                    </div>
                    <Button  variant="contained" color="primary" // <-- Just add me!
                             label='My Label' className={classes.button} onClick={this.handleUpdate}>
                        Modifier mes informations
                    </Button>
                </CardContent>
                </Card>
                <ViewImage/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userName: state.user.name,
        userLastname: state.user.lastname,
        email: state.user.email,
        canceled: state.uploadimg.canceled,
        director: state.login.director,
        idProf: state.login.id_user,
        token: state.login.token
    };
};

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        onPickImage: (file) => dispatch({ type: "GET_IMG_REQUEST", file }),
        ChangeUserInfos: (prenomProf, nomProf, emailProf, idProf, token) => dispatch({type: 'UPDATE_PROF_REQUEST', prenomProf, nomProf, emailProf, idProf, token})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));