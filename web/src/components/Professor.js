import {connect} from 'react-redux';
import React, { Component } from 'react';

class Professor extends Component{
    constructor(props){
        super(props);

        this.handleGetProf = this.handleGetProf.bind(this);
        //this.props.professorActions.get_professor();
    }

    handleGetProf(){
        this.props.professorActions.get_professor();
    }s

    render(){
        const { fetching, nomProf, prenomProf, emailProf, onRequestProf, error } = this.props;
        return(
            <div>

                <div> Le nom est: {nomProf}, le prenom est: {prenomProf}, l'email est: {emailProf}</div>

                {fetching ? (
                    <button disabled>Fetching...</button>
                ) : (
                    <button onClick={onRequestProf}>Request a prof</button>
                )}

                {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        fetching: state.professor.fetching,
        nomProf: state.professor.nomProf,
        prenomProf: state.professor.prenomProf,
        emailProf: state.professor.emailProf,
        error: state.professor.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestProf: () => dispatch({ type: "API_CALL_REQUEST" })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Professor);