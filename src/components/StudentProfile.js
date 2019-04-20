import React, { Component } from 'react';
import "../css/Login.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import One_profile from './One_profile';
import Stats from "./studentStatistics";
import BulletinPDF from "./BulletinPDF";

const styles = {
    root: {
        flexGrow: 1,
    },
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class StudentProfile extends Component{

    constructor (props){
        super(props);

        this.state={
            value: 0,
            idStudent: null
        }
    }


        componentDidMount() {
            const { match: { params }, getStudentInfo } = this.props;

            this.setState({idStudent: params.id});

            getStudentInfo(params.id, this.props.token);
    }



    handleChange = (event, value) => {
        this.setState({ value });
    };


    render(){

        const { classes } = this.props;

        return(
            <div>
                <Card className={classes.card} classes={{root: classes.card}} style={{backgroundColor: '#e0f7fa'}}>
                    <h1 style={{textAlign: 'center'}}>{this.props.nomEleve !== null && this.props.prenomEleve !== null ? this.props.prenomEleve + ' ' + this.props.nomEleve : ''}</h1>
                    <CardContent style={{padding: '0', margin:'1%'}}>
                        <Paper className={classes.root} style={{backgroundColor: 'rgb(255, 255, 246)'}}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered
                            >
                                <Tab label="Informations de l'éleve" />
                                <Tab label="Statistiques" />
                                <Tab label="Historique" />
                            </Tabs>
                        </Paper>

                        {this.state.value === 0 && <TabContainer><One_profile id={this.state.idStudent}/></TabContainer>}
                        {this.state.value === 1 && <TabContainer><Stats  idStudent={this.state.idStudent}/></TabContainer>}
                        {this.state.value === 2 && <TabContainer><BulletinPDF/></TabContainer>}

                    </CardContent>
                </Card>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.login.token,
        nomEleve: state.studentProfile.nomEleve,
        prenomEleve: state.studentProfile.prenomEleve
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStudentInfo: (id, token) => dispatch({ type: "STUDENT_PROFILE_REQUEST", id, token })
    };
};



StudentProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentProfile));