import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import loader from '../images/loaders/bars-loader.gif';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import ChangeIdentifiant from './changeIdentifiant';
import ChangePass from './changePass';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const styles = {
    root: {
        flexGrow: 1,
    },
};

class changePassword extends Component{

    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open,
            passpending: false,
            value: 0
        }

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(){

        this.state.open = this.props.open;

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){

        const { classes } = this.props;

        return(
            <div >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth='md'
                    fullWidth={true}
                >
                    <div>
                        <DialogContent>
                            <Paper className={classes.root} style={{backgroundColor: 'rgb(255, 255, 246)'}}>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Identifiant" />
                                    <Tab label="Mot de passe" />
                                </Tabs>
                            </Paper>

                            {this.state.value === 0 && <TabContainer><ChangeIdentifiant/></TabContainer>}
                            {this.state.value === 1 && <TabContainer><ChangePass/></TabContainer>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

            </div>
        );
    }

}



changePassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(changePassword);