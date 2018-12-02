import React, { Component } from 'react';
import Student from './Student';
import "../css/Login.css";
import {connect} from "react-redux";

class Students extends Component {

    constructor(props) {

        super(props);

        this.test = this.test.bind(this);

    }

    componentWillMount(){
        const { getStudents, token } = this.props;

         getStudents(token);

    }

    test(){
        return <Student students={this.props.students}/>;
    }

    render() {

        if (this.props.asking){
            return <div></div>;
        }else{

            return <div>
                <Student students={this.props.students}/>
            </div>;
        }

    }
}


const mapStateToProps = state => {
    return {
        students: state.students.content,
        asking: state.students.asking,
        token: state.login.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStudents: (token) => dispatch({ type: "GET_STUDENTS_REQUEST", token})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);