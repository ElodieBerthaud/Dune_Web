import React, { Component } from 'react';
import Student from './Student';
import "../css/Login.css";
import {connect} from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import dashboardStyle from "./Dashboard/styles/dashboardStyle";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Loader from './Loader';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Students extends Component {

    state = {
        classeName: 0
    }

    constructor(props) {

        super(props);

        this.test = this.test.bind(this);

    }

    componentWillMount(){
        const { getStudents, token } = this.props;

         getStudents(token, this.props.typeUser, this.props.idUser, 0);

         this.props.getClasses(token, this.props.typeUser, this.props.idUser);

    }

    test(){
        return <Student students={this.props.students}/>;
    }

    renderClasses() {

        const {classesS} = this.props;

        let classes = [];

        var i = 0;

        classes.push(
            <MenuItem key={i} value={0}>Toutes</MenuItem>
        )

        for (var data in classesS){
            classes.push(
                <MenuItem key={classesS[data].idClasse+'-'+i} value={classesS[data].idClasse}>{classesS[data].label}</MenuItem>
            );
            i++;
        }
        return classes;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        this.props.getStudents(this.props.token, this.props.typeUser, this.props.idUser, event.target.value);
    };

    render() {

        const { classes } = this.props;

        return <div>
                <Loader open={this.props.asking}/>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Classes</InputLabel>
                    <Select
                        value={this.state.classeName}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'classeName',
                            id: 'classe-simple',
                        }}
                    >
                        {this.renderClasses()}
                    </Select>
                </FormControl>

                <Student students={this.props.students}/>
            </div>;
        }

}

Students.propTypes = {
    classes: PropTypes.object.isRequired
};


const mapStateToProps = state => {
    return {
        students: state.students.content,
        asking: state.students.asking,
        token: state.login.token,
        typeUser: state.login.typeUser,
        idUser: state.login.id_user,
        classesS: state.classes.classes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStudents: (token, typeUser, idUser, idClasse) => dispatch({ type: "GET_STUDENTS_REQUEST", token, typeUser, idUser, idClasse}),
        getClasses: (token, typeUser, idUser) => dispatch({ type: "GET_CLASSES_REQUEST", token, typeUser, idUser})

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Students)));