import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import html2canvas from 'html2canvas';

import * as jsPDF from 'jspdf'

const styles = {
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
};

class BulletinPDF extends Component {

    constructor(props) {

        super(props);

        this.state = {};

        this.id = 0;

    }

    componentDidMount() {

    }

    test =() => {

        const input = document.getElementById('stats-pdf');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            });

    }

    render() {
        const classes = this.props;

        return (
            <div>
                <div id={"stats-pdf"} style={{backgroundColor: '#f5f5f5',
                    width: '210mm',
                    minHeight: '297mm',
                    marginLeft: 'auto',
                    marginRight: 'auto'}}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat (g)</TableCell>
                                <TableCell align="right">Carbs (g)</TableCell>
                                <TableCell align="right">Protein (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    bonjour
                                </TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    bonjour
                                </TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    bonjour
                                </TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    bonjour
                                </TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                                <TableCell align="right">bonjour</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div id={"print-png"}>
                    <button onClick={this.test}>
                        SAVE
                    </button>
                </div>
            </div>
        );
    }

}

BulletinPDF.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {};

};

const mapDispatchToProps = dispatch => {

    return {};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BulletinPDF)));