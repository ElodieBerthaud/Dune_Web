import {connect} from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router";

import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Games from '@material-ui/icons/Games';
import Apps from '@material-ui/icons/Apps';
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "./Dashboard/GridItem.jsx";
import GridContainer from "./Dashboard/GridContainer.jsx";
import Table from "./Dashboard/Table.jsx";
import Tasks from "./Dashboard/Tasks.jsx";
import CustomTabs from "./Dashboard/CustomTabs.jsx";
import Danger from "./Dashboard/Danger.jsx";
import Card from "./Dashboard/Card.jsx";
import CardHeader from "./Dashboard/CardHeader.jsx";
import CardIcon from "./Dashboard/CardIcon.jsx";
import CardBody from "./Dashboard/CardBody.jsx";
import CardFooter from "./Dashboard/CardFooter.jsx";


import { bugs, website, server } from "./variables/general.jsx";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "./variables/charts.jsx";

import dashboardStyle from "./Dashboard/styles/dashboardStyle.jsx";

class Dashboard extends React.Component {
    state = {
        value: 0
    };

    constructor(props){
        super(props);

        this.state = {
            open: false
        };

        this.director_report = this.director_report.bind(this);
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    director_report(isDirector){
        if (isDirector){
            return (
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Tasks:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Bugs",
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
                                tabName: "Website",
                                tabIcon: Code,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0]}
                                        tasksIndexes={[0, 1]}
                                        tasks={website}
                                    />
                                )
                            },
                            {
                                tabName: "Server",
                                tabIcon: Cloud,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[1]}
                                        tasksIndexes={[0, 1, 2]}
                                        tasks={server}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
            );
        }
    }

    render() {
        const { classes } = this.props;
        const { name, lastname, isDirector } = this.props;

        return (
            <div>
                <div style={{marginBottom: '2%'}}>
                    <h1 style={{textAlign: 'center', color: 'grey'}}>Bonjour {this.props.name} {this.props.lastname}, que voulez-vous faire aujourd'hui ?</h1>
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
                                    <h3 className={classes.cardTitle}>34</h3>
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
                                    <h3 className={classes.cardTitle}>12</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <DateRange />
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
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
                                <CardHeader color="info">
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
        isDirector: state.login.director
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestProf: () => dispatch({ type: "API_CALL_REQUEST" })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard)));