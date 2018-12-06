import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ReactDOM from "react-dom";

import {withStyles} from "@material-ui/core/styles/index";


class ViewImage extends Component{

    constructor(props) {

        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            open: false,
            image: null
        }

    }

    handleSelect(){

        const {email, idUser, token, file_upload} = this.props;

        this.setState({ open: false });

        this.props.SelectImage(file_upload, idUser, email, token);

    }

    handleCancel(){

        this.setState({ open: false });

        this.props.CancelImage();

    }

    render() {

        return (

            <Dialog
                open={this.props.prevImage}
                aria-labelledby="scroll-dialog-title">
                <DialogTitle id="scroll-dialog-title" style={{textAlign: 'center'}}>Votre photo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img style={{width: '100%', height:'100%'}} src={this.props.image}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleSelect}>
                        Choisir
                    </Button>
                    <Button  color="primary" onClick={this.handleCancel}>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


const mapStateToProps = state => {
    return {
        image: state.uploadimg.file_preview,
        prevImage: state.uploadimg.prevImage,
        email: state.professor.emailProf,
        idUser: state.login.id_user,
        token: state.login.token,
        file_upload: state.uploadimg.file_upload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CancelImage: () => dispatch({ type: "EMPTY_IMG_REQUEST" }),
        SelectImage: (file, idProf, email, token) => dispatch({ type: "UPLOAD_IMG_REQUEST", file, idProf, email, token })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewImage);