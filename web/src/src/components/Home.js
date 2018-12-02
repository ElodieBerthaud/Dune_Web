import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';

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
        console.log(this.state.ishover1);
        console.log(this.state.ishover2);
        return (
            <div className={classes.root}>
                <h2 className="text-center"> Bonjour, sur quel type de compte voulez-vous vous connecter ? </h2>
                <Grid container spacing={24} style={{ margin: "0, auto"}}>
                    <Grid item xs={6} >
                        <div  onMouseEnter={ this.handleHover1 } onMouseLeave={ this.handleHover1 }>
                            <Paper onClick={this.handleLogin} className={classes.paper} style={this.state.ishover1 ? {backgroundColor:"#fee599", cursor: "pointer"} : {backgroundColor: ""}}>
                                Directeur<br/>
                                <span style={{fontSize:'0.8em'}}>Vous aurez accès à la gestion de vos professeurs, de vos classes et de vos élèves</span>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div onMouseEnter={ this.handleHover2 } onMouseLeave={ this.handleHover2 }>
                            <Paper onClick={this.handleLogin}  className={classes.paper} style={this.state.ishover2 ? {backgroundColor:"#00BCD4", cursor: "pointer"} : {backgroundColor: ""}}>
                                Professeur <br/>
                                <span style={{fontSize:'0.8em'}}>Vous aurez accès à la gestion de vos élèves, leurs suivi pédagogiques et aux activités</span>
                            </Paper>
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