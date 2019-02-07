import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rater from 'react-rater';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import dashboardStyle from "./Dashboard/styles/dashboardStyle";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class AppPage extends React.Component {

    state = {
        id: null,
        value: 0,
        nameApp: null,
        picPath: null,
        nomCreator: null,
        openAskApp: false
    }

    constructor(props){
        super(props);
    }

    componentDidMount () {

        const { id } = this.props.match.params

        this.state.id = id;

        this.props.getApp(this.state.id, this.props.token, this.props.idEcole);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleGetApp = (event, value) => {

        if (this.props.appStatus === '0'){
            this.setState({openAskApp: true});
        }

    }

    handleConfirmAsk = () =>{

        this.props.AskApp(this.state.id, this.props.token, this.props.idProf, this.props.idEcole, null);

    }


    handleClose = () =>{
        this.setState({ openAskApp: false });
    };

    render() {

        if (this.props.app != null){
            this.state.nameApp = this.props.app.nomApp;
            this.state.picPath = this.props.app.picPath;
            this.state.nomCreator = this.props.app.nomCreator;
        }

        const {classes} = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                                <img style={{width: '100%'}} src={"http://176.31.252.134:7001/files/apps/" + this.state.picPath}/>
                        </Grid>
                        <Grid item xs={3} style={{lineHeight: '2.5'}}>
                            {this.state.nameApp}
                            <br />
                                1.0.1
                            <br />
                                MATHEMATIQUES
                            <br />
                            {this.state.nomCreator}
                            <br />
                                2-4 joueurs
                            <br />
                                <Rater total={5} rating={4} interactive={false} />
                            <br />
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'center'}}>
                                <Button
                                    onClick={this.handleGetApp}
                                    style={{width: '50%', margin: '0 auto'}}
                                    variant="contained" color="primary" // <-- Just add me!
                                    label='My Label' className={classes.button}>
                                    <input style={{position: 'absolute', opacity: '0'}}/>
                                    {this.props.appStatus === '0' ? 'SOUMETTRE' : 'DEJA DANS LA BIBLIOTHEQUE'}
                                </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <img style={{width: '20%', margin: '2%'}} src={require('../images/store/71r6d65MteL.png')} />
                                <img style={{width: '20%', margin: '2%'}} src={require('../images/store/71r6d65MteL.png')} />
                                <img style={{width: '20%', margin: '2%'}} src={require('../images/store/71r6d65MteL.png')} />
                                <img style={{width: '20%', margin: '2%'}} src={require('../images/store/71r6d65MteL.png')} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Grid>
                        <Grid item xs={6}>
                            <span style={{fontWeight: 'bold'}}>Developpeur</span><br/>
                            {this.state.nomCreator}
                        </Grid>
                        <Grid item xs={6}>
                            <span style={{fontWeight: 'bold'}}>Categorie</span><br/>
                            Mathematiques.
                        </Grid>
                        <Grid item xs={6}>
                            <span style={{fontWeight: 'bold'}}>Joueurs</span><br/>
                            2-4 joueurs
                        </Grid>
                        <Grid item xs={6}>
                            <span style={{fontWeight: 'bold'}}>Niveau</span><br/>
                            CE1
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Avis" />
                                <Tab label="Laisser un avis" />
                            </Tabs>

                            {this.state.value === 0 && <TabContainer></TabContainer>}
                            {this.state.value === 1 && <TabContainer></TabContainer>}

                        </Grid>
                    </Grid>
                </CardContent>

                <Dialog
                    open={this.state.openAskApp}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={this.state.loader ? {display:"none"} : {display:''}}>
                        <DialogTitle id="form-dialog-title">Demande d'application</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Vous êtes sur le point de faire une demande d'achat d'application a votre directeur d'etablissement. Cette application ne sera disponible que si
                                le directeur l'accepte. Etes-vous sur de vouloir continuer ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.handleConfirmAsk} color="primary">
                                Oui
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>

            </Card>
        );
    }
}

AppPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        token: state.login.token,
        app: state.appPage.appContent,
        idEcole: state.login.idEcole,
        appStatus: state.appPage.status,
        idProf: state.login.id_user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getApp: (idApp, token, idEcole) => dispatch({ type: "GET_APP_REQUEST", idApp, token, idEcole }),
        AskApp: (idApp, token, idProf, idEcole, commentaire) => dispatch({ type: "ASK_APP_REQUEST", idApp, token, idProf, idEcole, commentaire })
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(AppPage)));