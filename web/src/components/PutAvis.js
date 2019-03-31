import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({

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

    changeRate = (event) =>{

        const rate = document.getElementsByClassName('react-rater-star is-active')[0].style;

        console.log(rate);

        this.state.rate = event.rating;

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    sendAvis = () => {

        console.log(this.state.multiline);
        console.log(this.state.rate);

        console.log(this.props.id);

        this.props.AddAvis(this.props.id, this.state.rate, this.state.multiline, this.props.token);

        this.setState({multiline: '', rate: 5});

    }

    render() {

        const classes = this.props;

        return (
            <div>

                <h2 style={{textAlign: 'center'}}>Qu'avez-vous pensé de cette application ? </h2>

                <form className={classes.container} noValidate autoComplete="off">

                    <Rater
                        onRate={this.changeRate}
                        total={5}
                        rating={this.state.rate}
                        interactive={true}
                        style={{fontSize: '2em', textAlign: 'center'}}
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
                        name='multiline'
                        fullWidth
                        rows={6}
                    />

                    <div style={{textAlign: 'center'}}>

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

const mapStateToProps = state => {

    return {
        token: state.login.token,
        id: state.appPage.appContent.id
    };

};

const mapDispatchToProps = dispatch => {

    return {
        AddAvis: (idGame, note, commentaire, token) => dispatch({ type: "ADD_AVIS_REQUEST", idGame, note, commentaire, token })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PutAvis)));