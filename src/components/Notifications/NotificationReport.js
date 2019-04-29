import React, { Component } from 'react';
import "../../css/Login.css";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import dashboardStyle from "../Dash/Dashboard/styles/dashboardStyle.jsx";
import {bugs, website} from "../Dash/variables/general.jsx";
import GridItem from "../Dash/Dashboard/GridItem.jsx";
import Tasks from "../Dash/Dashboard/Tasks.jsx";
import CustomTabs from "../Dash/Dashboard/CustomTabs.jsx";
import BugReport from "@material-ui/icons/Help";
import Code from "@material-ui/icons/History";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

class NotificationReport extends Component{

    constructor(props){
        super(props);
    }

    render(){

        if (this.props.isDirector) {

            return (
                <GridItem xs={12} sm={12} md={this.props.size}>
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
        else{
            return '';
        }
    }

}


NotificationReport.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        isDirector: state.login.director,
        token: state.login.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(NotificationReport)));