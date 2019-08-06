import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#ff5252',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ffebee',
        },
    },
});

let id = 0;
function createData(libelle, type, date, price, status) {
    id += 1;
    return { id, libelle, type, date, price, status };
}

const rows = [
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/06/2019', '60 euros', 'En attente'),
    createData(<a href={'/facturation/12'}>Jeu calcul mental</a>, 'Jeu', '29/06/2019', '55 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/05/2019', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/04/2019', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/03/2019', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Jeu 1, 2, 3</a>, 'Jeu', '13/03/2019', '55 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Jeu 1, 2, 3</a>, 'Jeu', '13/03/2019', '55 euros', 'Annulé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/02/2019', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/01/2019', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/12/2018', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/11/2018', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/10/2018', '60 euros', 'Payé'),
    createData(<a href={'/facturation/12'}>Echéancier abonnement Premium</a>, 'Abonnement', '28/09/2018', '60 euros', 'Payé'),
];

function FactureList(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Libelle</CustomTableCell>
                        <CustomTableCell align="right">Type</CustomTableCell>
                        <CustomTableCell align="right">Date</CustomTableCell>
                        <CustomTableCell align="right">Montant</CustomTableCell>
                        <CustomTableCell align="right">Statut</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow className={classes.row} key={row.id}>
                            <CustomTableCell component="th" scope="row">
                                {row.libelle}
                            </CustomTableCell>
                            <CustomTableCell align="right">{row.type}</CustomTableCell>
                            <CustomTableCell align="right">{row.date}</CustomTableCell>
                            <CustomTableCell align="right">{row.price}</CustomTableCell>
                            <CustomTableCell align="right">{row.status}</CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

FactureList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null, null)(withStyles(styles)(FactureList));
