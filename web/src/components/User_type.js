import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        textAlign: 'center',
        color: theme.palette.text.primary,
        onHover: theme.palette.text.secondary,
    }
});

class GuttersGrid extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            spacing: '16',
            ishover1:false,
            ishover2:false
        };

        this.handleHover1 = this.handleHover1.bind(this);
        this.handleHover2 = this.handleHover2.bind(this);
    }


    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleHover1(){
        this.setState({
            ishover1: !this.state.ishover1
        });
    }

    handleHover2(){
        this.setState({
            ishover2: !this.state.ishover2
        });
    }

    handleLogin(){
        window.location = '/login';
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h2 className="text-center"> Je veux me connecter en tant VVVVque : </h2>
                <Grid container spacing={24}>
                    <Grid item xs={6} >
                        <div  onMouseEnter={ this.handleHover1 } onMouseLeave={ this.handleHover1 }>
                            <Paper onClick={this.handleLogin} className={classes.paper} style={this.state.ishover1 ? {backgroundColor:"#fee599", cursor: "pointer"} : {backgroundColor: ""}}>Directeur</Paper>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div onMouseEnter={ this.handleHover2 } onMouseLeave={ this.handleHover2 }>
                            <Paper className={classes.paper} style={this.state.ishover2 ? {backgroundColor:"#E0F7FA", cursor: "pointer"} : {backgroundColor: ""}}>Professeur</Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

var button = {
    paddingTop: 10
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);