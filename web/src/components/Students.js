import React, { Component } from 'react';
import Student from './Student';
import "../css/Login.css";
import {connect} from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import dashboardStyle from "./Dashboard/styles/dashboardStyle.jsx";
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Loader from './Loader';
import TextField from '@material-ui/core/TextField';

const $ = window.$;

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        display: 'inline-block'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Students extends Component {

    state = {
        classeName: 0,
        Classe: '',
        classesLabel: null,
        searchName: ''
    }

    constructor(props) {

        super(props);

        this.test = this.test.bind(this);


        let classesLabel = {
            1: 'Petite section',
            2: 'Moyenne Section',
            3: 'Grande section',
            4: 'CP',
            5: 'CE1',
            6: 'CE2',
            7: 'CM1',
            8: 'CM2',
            9: '6e',
            10: '5e',
            11: '4e',
            12: '3e'};

        this.state.classesLabel = classesLabel;
    }

    componentWillMount(){
        const { getStudents, token } = this.props;

         getStudents(token, this.props.typeUser, this.props.idUser, 0, '');

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
            <MenuItem id={0} key={i} value={0}>Toutes</MenuItem>
        )

        for (var data in classesS){
            classes.push(
                <MenuItem id={classesS[data].idClasse} key={classesS[data].idClasse+'-'+i} value={classesS[data].idClasse}>{this.state.classesLabel[classesS[data].level] + '-' + classesS[data].num}</MenuItem>
            );
            i++;
        }
        return classes;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        this.setState({Classe: document.getElementById(event.target.value).innerText});

        this.props.getStudents(this.props.token, this.props.typeUser, this.props.idUser, event.target.value);
    };

    searchName = event => {
        this.setState({ [event.target.name]: event.target.value });

        this.props.getStudents(this.props.token, this.props.typeUser, this.props.idUser, this.state.classeName, event.target.value);
    }

    render() {

        const { classes } = this.props;

        return <div>
            <h1 style={{textAlign: 'center'}} >Trombinoscope</h1>
                <Loader open={this.props.asking}/>
                    <div style={{textAlign: 'center', marginBottom: '2%'}}>
                        <h2 style={{fontStyle: 'italic'}}> {this.state.classeName === 0 ? "Eleves de toutes vos classes confondues." : "Eleves de la classe " + this.state.Classe}</h2>
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
                            <TextField
                                id="standard-name"
                                label="Name"
                                className="fwfew"
                                value={this.state.searchName}
                                margin="normal"
                                onChange={this.searchName}
                                name='searchName'
                                defaultValue=''
                            />
                        </FormControl>
                    </div>
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
        getStudents: (token, typeUser, idUser, idClasse, search) => dispatch({ type: "GET_STUDENTS_REQUEST", token, typeUser, idUser, idClasse, search}),
        getClasses: (token, typeUser, idUser) => dispatch({ type: "GET_CLASSES_REQUEST", token, typeUser, idUser})

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Students)));