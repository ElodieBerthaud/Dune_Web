import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";



const styles = {
    card: {
    },
    media: {
        height: 50,
    },
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('App1', '18/11/2018', 'En attente'),
    createData('App2', '15/11/2018', 'Approuve'),
    createData('App3', '06/11/2018', 'Approuve'),
    createData('App4', '30/10/2018', 'Approuve'),
    createData('App5', '05/10/2018', 'Refuse'),
];

class AskedApps extends Component{

    render(){

        const { classes } = this.props;

        return(
            <div style={{textAlign: 'center'}}>
                <Paper className={classes.root} style={{width: '80%', margin: '0 auto'}}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Application</TableCell>
                                <TableCell numeric style={{textAlign: 'center'}}>Date de demande </TableCell>
                                <TableCell numeric style={{textAlign: 'center'}}>Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row" style={{textAlign: 'left'}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell numeric style={{textAlign: 'center'}}>{row.calories}</TableCell>
                                        <TableCell numeric style={{textAlign: 'center'}}>{row.fat}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }

}

AskedApps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AskedApps);;