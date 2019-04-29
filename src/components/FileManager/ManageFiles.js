import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stop from "../../images/stop.png";
import Delete from "@material-ui/icons/DeleteForeverTwoTone";
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
    italic:{
        fontStyle: 'italic',
        textAlign: 'center'
    },
    textCenter: {
        textAlign: "center"
    },
    alertMsg: {
        fontSize: '1.5em'
    },
    deleteImg: {
        fontSize: '5em'
    },
    delete:{
        cursor: 'pointer'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%'
    },
    updateFields:{
        width: '90%'
    },
    infoMsg: {
        fontSize: '1.2em'
    },
    updateBtn:{
        float: 'left'
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ManageFiles extends Component {

    constructor(props) {

        super(props);

        this.state = {
            manage: this.props.manage,
            idFile: this.props.id,
            owner: this.props.owner,
            desc: '',
            name: '',
            private: false,
            delete: false
        };

    }

    componentWillUpdate(nextProps, nextState, nextContext) {

        if (this.state.manage !== nextProps.manage)
            this.setState({manage: nextProps.manage});
        if (this.state.owner !== nextProps.owner)
            this.setState({owner: nextProps.owner});
        if (this.state.name !== nextProps.titre)
            this.setState({name: nextProps.titre});
        if (this.state.desc !== nextProps.desc)
            this.setState({desc: nextProps.desc});
        if (this.state.private !== nextProps.private)
            this.setState({private: nextProps.private});
        if (this.state.idFile !== nextProps.id)
            this.setState({idFile: nextProps.id});
    }

    handleClose = () =>{
        this.setState({manage: false});
        this.props.updateOpened(false);
    }

    handleCloseDel = () =>{
        this.setState({delete: false});
    }

    handleOpenDel = () =>{
        this.setState({delete: true});
    }

    handleCheck = (event, value) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    renderDialogContent = () => {

        const { classes } = this.props;

        if (this.state.owner){
            return (
                <Grid container spacing={24}
                      direction="row"
                      alignItems="center"
                        className={classes.textCenter}>
                    <Typography className={classes.infoMsg}>Vous pouvez modifier les informations du fichier ou bien le supprimer.</Typography>
                    <Grid item xs={8}>
                        <Paper className={[ 'paper' ].join(' ')}>
                            <TextField
                                id="outlined-name"
                                label="Nouveau titre de fichier"
                                className={classes.textField}
                                value={this.state.name}
                                name={"name"}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-multiline-flexible"
                                label="Nouvelle description"
                                multiline
                                rowsMax="4"
                                value={this.state.desc}
                                onChange={this.handleChange}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name='desc'
                                rows={4}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.private}
                                        value={''}
                                        name="private"
                                        onChange={this.handleCheck}
                                    />
                                }
                                label={"Fichier privé"}
                        />

                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography className={classes.alertMsg}>OU</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.delete} onClick={this.handleOpenDel}>
                        <Paper className={[ 'paper', 'textCenter' ].join(' ')}>
                            <Tooltip title="Supprimer le fichier" placement="top-start">
                                <Delete className={classes.deleteImg}/>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>
            );

        }else{
            return(
                <div className={classes.textCenter}>
                    <img width={100} height={100} src={Stop}/>
                    <Typography className={classes.alertMsg}>Vous n'êtes pas le propriétaire de ce fichier, vous n'avez donc pas les droits pour le modifier/supprimer.</Typography>
                </div>);
        }
    }


    handleChange = (event, value) => {

            this.setState({ [event.target.name]: event.target.value });
    };

    handleUpdate = () => {
        console.log(this.state);
        this.props.updateFile(this.props.token, this.state.name, this.state.desc, this.state.private, this.state.idFile);
    }

    handleDel = () => {
        this.props.deleteFile(this.props.token, this.state.idFile);
    }

    render() {

        const { classes } = this.props;

        console.log(this.state.owner);

        return (
            <div>
                <Dialog
                    open={this.state.manage}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">{this.props.titre}</Typography>
                            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                    </MuiDialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" className={classes.italic}>
                            «{this.props.desc}»
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <div className={classes.root}>
                            {this.renderDialogContent()}
                        </div>
                    </DialogContent>
                    <DialogActions  className={classes.updateBtn}>
                        {this.state.owner ?
                            <Button onClick={this.handleUpdate} color="primary">
                                Modifier
                            </Button>
                        : ''}
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.delete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">Supprimer le fichier - {this.props.titre}</Typography>
                        <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </MuiDialogTitle>
                    <DialogContent>
                        <Typography> Êtes-vous sûr de vouloir supprimer ce fichier ? Cette opération est irréversible. </Typography>
                    </DialogContent>
                    <DialogActions  className={classes.updateBtn}>
                            <Button onClick={this.handleDel} color="primary">
                                Oui
                            </Button>
                            <Button onClick={this.handleCloseDel} color="primary">
                                Annuler
                            </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }

}

ManageFiles.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        updateFile: (token, newTitle, newDesc, privateF, idFile) => dispatch({type: 'UPDATE_FILE', token, newTitle, newDesc, privateF, idFile}),
        deleteFile: (token, idFile) => dispatch({type: "DELETE_FILE", token, idFile})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageFiles)));