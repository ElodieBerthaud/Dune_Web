import {connect} from 'react-redux';
import React  from 'react';
import { withRouter } from "react-router";

import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Games from '@material-ui/icons/Games';
import Apps from '@material-ui/icons/Apps';
import BugReport from "@material-ui/icons/Help";
import Code from "@material-ui/icons/History";
// core components
import GridItem from "./Dashboard/GridItem.jsx";
import GridContainer from "./Dashboard/GridContainer.jsx";
import Table from "./Dashboard/Table.jsx";
import Tasks from "./Dashboard/Tasks.jsx";
import CustomTabs from "./Dashboard/CustomTabs.jsx";
import Card from "./Dashboard/Card.jsx";
import CardHeader from "./Dashboard/CardHeader.jsx";
import CardIcon from "./Dashboard/CardIcon.jsx";
import CardBody from "./Dashboard/CardBody.jsx";
import CardFooter from "./Dashboard/CardFooter.jsx";


import { bugs, website } from "./variables/general.jsx";

import {
    dailySalesChart
} from "./variables/charts.jsx";

import dashboardStyle from "./Dashboard/styles/dashboardStyle.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Visibility';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Img from '../images/avatar.png';

class Dashboard extends React.Component {
    state = {
        value: 0
    };

    constructor(props){
        super(props);

        this.state = {
            open: false,
            dashBoardNotif: false,
            openNotif: false,
            appsAsked: [],
            expanded: null
        };

        this.director_report = this.director_report.bind(this);
        this.generateAllNotif = this.generateAllNotif.bind(this);

    }

    componentWillMount(){
        const { getStudentsNbr, getAppsNbr, token } = this.props;

        getStudentsNbr(token);
        getAppsNbr(token);

    }

    componentWillUpdate(){

    }

    director_report(isDirector){
        if (isDirector){
            return (
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Demandes d'applications:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Demandes",
                                tabIcon: BugReport,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0, 3]}
                                        tasksIndexes={[0, 1, 2, 3]}
                                        tasks={bugs}
                                    />
                                )
                            },
                            {
                                tabName: "Historiques",
                                tabIcon: Code,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0]}
                                        tasksIndexes={[0, 1]}
                                        tasks={website}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
            );
        }
    }

    showNotif(idNotif) {

        this.setState({ openNotif: true });

        this.props.showNotif(idNotif, this.props.token);
    }

    generateAllNotif = () => {

        let obj = this.props.content;

        let notifs = [];

        var id = null;


        if (obj != null){

            for (var i = 0; i < this.props.nbNotifs; i++) {

                id = obj[i].idNotif;

                if (obj[i].isRead === 0) {


                    notifs.push(
                        <ListItem key={i} role={undefined} dense button>
                            <ListItemText primary={obj[i].textNotif} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.showNotif.bind(this, id)} aria-label="Comments">
                                    <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );

                }
            }
        }
        return notifs;

    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    renderNotification = () => {
        let content = [];

        if (this.props.typeUser === 2){

            content.push(<div>
                <DialogContentText key={this.props.idAppNotif}>
                Vous avez une demande d'application.
                Cela concerne l'application {this.props.nomAppNotif}. {" "}
                <a target="_blank" href={'/store/' + this.props.idAppNotif}>Cliquez ici</a>
                {" "}pour voir l'application.<br/><br/>
                Voulez-vous accpeter cette demande ?
                    <br/><br/>
            </DialogContentText>
                <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}  style={{overflow: "hidden"}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >Qui a demande cette application ?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Laurine Fourcade" src={Img} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Professeur"
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" color="textPrimary">
                                                    Laurine Fourcade
                                                </Typography>
                                                {"J'aimerai cette application !!!"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Laurine Fourcade" src={Img} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Professeur"
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" color="textPrimary">
                                                    Laurine Fourcade
                                                </Typography>
                                                {"J'aimerai cette application !!!"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )

        }else{
            content.push(<DialogContentText>

                    Votre directeur d'etablissement a {this.props.isNotifAccepted === 0 ? ' refusé ' : ' accepté '} votre demande d'achat de l'application
                    {" "} {this.props.nomAppNotif}.

                </DialogContentText>
            );
        }
        return content;
    }

    acceptAppRequest = () => {

        this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 1, this.props.idNotif)

    }

    declineAppRequest = () => {

        this.props.validateApp(this.props.typeUser, this.props.token, this.props.idDemandeNotif, 0, this.props.idNotif)

    }

    handleCloseNotif= () => {

        this.props.readNotif(this.props.idNotif, this.props.token);
        this.setState({open: false});
        window.location.reload();

    }

    handleClose = () => {
        this.setState({ anchorEl: null, open: false, openNotif: false });
    };

    handleCloseDashNotifs = () => {
        this.setState({ anchorEl: null, dashBoardNotif: false });
    };

    handleCloseDashNotifsStop = () => {
        this.setState({ anchorEl: null, dashBoardNotif: false });
        this.props.stopNotif();
    };

    render() {
        const { classes } = this.props;

        this.props.nbNotifs > 0 ? this.state.dashBoardNotif = true : this.state.dashBoardNotif = false;

        return (
            <div>
                <div style={{marginBottom: '2%'}}>
                    <h2 style={{textAlign: 'center', color: 'grey'}}>Bonjour {this.props.name} {this.props.lastname}, que voulez-vous faire aujourd'hui ?</h2>
                </div>
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="info" stats icon>
                                    <CardIcon color="info">
                                        <Accessibility />
                                    </CardIcon>
                                    <p className={classes.cardCategory}>Nombres d'éleves</p>
                                    <h3 className={classes.cardTitle}>{this.props.nbStudents}</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <Update />
                                        <a href="/students">
                                            Accéder au trombinoscope
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="primary" stats icon>
                                    <CardIcon color="primary">
                                        <Apps />
                                    </CardIcon>
                                    <p className={classes.cardCategory}>Applications / Jeux</p>
                                    <h3 className={classes.cardTitle}>{this.props.nbGames}</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <DateRange />
                                        <a href="/store" >
                                            Voir votre bibliothèque
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="success" stats icon>
                                    <CardIcon color="success">
                                        <Games />
                                    </CardIcon>
                                    <p className={classes.cardCategory}>Parties jouées</p>
                                    <h3 className={classes.cardTitle}>46</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <DateRange />
                                        Ce mois-ci
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card>
                                <CardHeader color="warning">
                                    <h4 className={classes.cardTitleWhite}>Classement global de vos éleves</h4>
                                    <p className={classes.cardCategoryWhite}>
                                        Classement de vos eleves pour ce trimestre.
                                    </p>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHeaderColor="warning"
                                        tableHead={["Nom", "Score", "Classe"]}
                                        tableData={[
                                            ["Dakota Rice", "1350", "CP"],
                                            ["Minerva Hooper", "1280", "CP"],
                                            ["Sage Rodriguez", "1100", "CE1"],
                                            ["Philip Chaney", "990", "CP"]
                                        ]}
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card chart>
                                <CardHeader color="warning">
                                    <ChartistGraph
                                        className="ct-chart"
                                        data={dailySalesChart.data}
                                        type="Line"
                                        options={dailySalesChart.options}
                                        listener={dailySalesChart.animation}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <h4 className={classes.cardTitle}>Statistiques globales de vos eleves pour cette semaine</h4>
                                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                      </span>{" "}
                                        augmentation de la moyenne
                                    </p>
                                </CardBody>
                                <CardFooter chart>
                                    <div className={classes.stats}>
                                        <AccessTime /> mis a jour il y a 1 heure
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        {this.director_report(this.props.isDirector)}
                    </GridContainer>
                </div>
                <Dialog
                    open={this.state.dashBoardNotif && this.props.showDash}
                    aria-labelledby="scroll-dialog-title">
                    <DialogTitle id="scroll-dialog-title" style={{textAlign: 'center'}}>Vous avez des notifications</DialogTitle>
                    <DialogContent>
                        <List>
                            {this.generateAllNotif()}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleCloseDashNotifs}>
                            Ok
                        </Button>
                        <Button color="primary" onClick={this.handleCloseDashNotifsStop}>
                            Ne plus me prévenir
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openNotif}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div>
                        <DialogTitle id="form-dialog-title">{this.props.typeNotif === 1 ? "Demande d'achat d'application." : "Votre demande d'application"}</DialogTitle>
                        <DialogContent>
                            {this.renderNotification()}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.acceptAppRequest} color="primary" style={{display: this.props.typeUser === 1 ? 'none' : ''}}>
                                Oui
                            </Button>
                            <Button onClick={this.declineAppRequest} color="primary" style={{display: this.props.typeUser === 1 ? 'none' : ''}}>
                                Non
                            </Button>
                            <Button onClick={this.handleClose} color="primary" style={{display: this.props.typeUser === 1 ? 'none' : ''}}>
                                Plus tard
                            </Button>
                            <Button onClick={this.handleCloseNotif} color="primary" style={{display: this.props.typeUser === 2 ? 'none' : ''}}>
                                Ok
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        name: state.user.name,
        lastname: state.user.lastname,
        isDirector: state.login.director,
        token: state.login.token,
        nbStudents: state.students.nbStudents,
        typeUser: state.login.typeUser,
        idUser: state.login.id_user,
        typeNotif: state.showNotif.typeNotif,
        nbNotifs: state.notification.nbNotif,
        content: state.notification.content,
        nomProfNotif: state.showNotif.nomProf,
        prenomProfNotif: state.showNotif.prenomProf,
        nomAppNotif: state.showNotif.nomApp,
        idAppNotif: state.showNotif.idApp,
        idDemandeNotif: state.showNotif.idDemande,
        idNotif: state.showNotif.idNotif,
        showDash: state.showDash.showDash,
        nbGames: state.appRegistred.appsNbr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showNotif: (idNotif, token) => dispatch({type: "SHOW_NOTIF_REQUEST", idNotif, token}),
        getStudentsNbr: (token) => dispatch({ type: "GET_STUDENTSNBR_REQUEST", token}),
        getAppsNbr: (token) => dispatch({ type: "GET_APPNBR_REQUEST", token}),
        validateApp: (typeUser, token, idDemande, validate, idNotif) => dispatch({type: "VALIDATE_APP_REQUEST", typeUser, token, idDemande, validate, idNotif}),
        readNotif: (idNotif, token)=> dispatch({type: "READ_NOTIF_REQUEST", idNotif, token }),
        stopNotif: () => dispatch({type: "NOTIFS_DASH_STOP" })

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard)));