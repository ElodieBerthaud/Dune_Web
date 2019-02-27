import React, { Component } from 'react';
import "../css/Login.css";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import dashboardStyle from "./Dashboard/styles/dashboardStyle";

class showNotif extends Component{

    render(){
        return(
            <div>
                Follow
            </div>
        );
    }

}


showNotif.propTypes = {
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
        nbGames: state.appRegistred.appsNbr,
        contentProf: state.showNotif.contentProf
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(showNotif)));