import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
// core components
import tasksStyle from "./styles/tasksStyle.jsx";
import {connect} from "react-redux";
import dashboardStyle from "./styles/dashboardStyle.jsx";
import {withRouter} from "react-router";

class Tasks extends React.Component {
  state = {
    checked: this.props.checkedIndexes
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

    acceptAppRequest = (idDemandeNotif, idNotif) => {

        this.props.validateApp(this.props.typeUser, this.props.token, idDemandeNotif, 1, idNotif)

    }

    declineAppRequest = (idDemandeNotif, idNotif) => {

        this.props.validateApp(this.props.typeUser, this.props.token, idDemandeNotif, 0, idNotif)

    }



    seeNotif = (idNotif) => {
        this.props.showNotif(idNotif, this.props.token);
    }

    renderNotifications = () => {

      const classes = this.props;

        let obj = this.props.content;

    if (obj !== null) {

        if (obj.length > 0) {

            const notifs = obj.map((obj) =>

                <TableRow key={obj.idNotif} className={classes.tableRow}>
                    <TableCell className={classes.tableCell} style={{padding: '0'}}>
                        Demande de l'application <a target="_blank"
                                                                      href={'/store/' + obj.idApp}>{obj.nomApp}.</a>
                    </TableCell>
                  <TableCell className={classes.tableActions}>
                        <Tooltip
                            id="tooltip-top"
                            title="Approuver"
                            placement="top"
                            classes={{tooltip: classes.tooltip}}
                        >
                            <IconButton
                                aria-label="Edit"
                                className={classes.tableActionButton}
                                onClick={() => this.acceptAppRequest(obj.idToNotify, obj.idNotif)}
                            >
                                <Edit
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.edit
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            id="tooltip-top-start"
                            title="Decliner"
                            placement="top"
                            classes={{tooltip: classes.tooltip}}
                            onClick={() => this.declineAppRequest(obj.idToNotify, obj.idNotif)}
                        >
                            <IconButton
                                aria-label="Close"
                                className={classes.tableActionButton}

                            >
                                <Close
                                    className={
                                        classes.tableActionButtonIcon + " " + classes.close
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                      <Tooltip
                          id="tooltip-top-start"
                          title="Voir"
                          placement="top"
                          classes={{tooltip: classes.tooltip}}
                          onClick={() => this.seeNotif(obj.idNotif)}
                      >
                          <IconButton
                              aria-label="Close"
                              className={classes.tableActionButton}

                          >
                              <RemoveRedEye
                                  className={
                                      classes.tableActionButtonIcon + " " + classes.close
                                  }
                              />
                          </IconButton>
                      </Tooltip>
                    </TableCell>
                </TableRow>
            )
            return notifs;
        }else{

            var notifs = [];

            notifs.push(
                <TableRow key={0} className={classes.tableRow}>
                    <TableCell className={classes.tableCell} style={{textAlign: 'center'}}>
                        Aucune demande d'achat d'application.
                    </TableCell>
                </TableRow>
            )

            return notifs;
        }
    }
  }

  render() {

    const { classes } = this.props;

    return (
      <Table className={classes.table}>
        <TableBody>
            <TableRow style={{width: '0', height: '0'}}/>
            { this.renderNotifications() }
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        typeUser: state.login.typeUser,
        typeNotif: state.showNotif.typeNotif,
        nbNotifs: state.notification.nbNotif,
        content: state.notification.content,
        token: state.login.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        validateApp: (typeUser, token, idDemande, validate, idNotif) => dispatch({type: "VALIDATE_APP_REQUEST", typeUser, token, idDemande, validate, idNotif}),
        readNotif: (idNotif, token)=> dispatch({type: "READ_NOTIF_REQUEST", idNotif, token }),
        showNotif: (idNotif, token) => dispatch({type: "SHOW_NOTIF_REQUEST", idNotif, token})

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(tasksStyle)(Tasks)));




