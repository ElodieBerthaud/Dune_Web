import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto'
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
    popover: {
        pointerEvents: 'none',
    },
});

class AddItemForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div className={classes.container}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        style={{width:'90%'}}
                        hintText="Nom"
                        floatingLabelText="Nom"
                    /><br />
                    <TextField
                        style={{width:'90%'}}
                        hintText="Prénom"
                        floatingLabelText="Prénom"
                    /><br />
                    <TextField
                    style={{width:'90%'}}
                    hintText="Adresse Email"
                    floatingLabelText="Adresse Email"
                /><br />
                    <div style={{margin: 0 + ' auto', marginTop: 5 + '%'}}>
                        <Typography
                            aria-owns={open ? 'mouse-over-popover' : null}
                            aria-haspopup="true"
                            onMouseEnter={this.handlePopoverOpen}
                            onMouseLeave={this.handlePopoverClose}
                        >
                             <Button size="large" variant="contained" style={{backgroundColor: '#00bcd4', color:'white'}}>
                                Valider
                            </Button>
                        </Typography>
                            <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                    paper: classes.paper,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={this.handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography style={{padding: 2 + '%'}}>
                                    En validant le formulaire, un mail va être envoyé au professeur que vous venez d'ajouter, avec son identifiant et son mot de passe.
                                </Typography>
                            </Popover>
                    </div>
                </form>
            </div>

        );
    };
}


AddItemForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddItemForm);