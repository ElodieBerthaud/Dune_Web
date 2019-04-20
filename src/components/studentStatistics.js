import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AverageTab from './AveragesTab';
import CountUp from 'react-countup';
import AverageChart from './AveragesChart';
import BulletinPDF from './BulletinPDF';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    }
});

class StudentStatistics extends Component {

    constructor(props) {

        super(props);

        this.state = {};

}

componentWillMount() {

        this.props.getStudentsResults(this.props.idStudent, this.props.token);

}

    render() {

            const data = this.props.content;

            let id = 0;

            function createData(matiere, moyenne, moyenneClasse, nbPlayed) {
                id += 1;
                return {id, matiere, moyenne, moyenneClasse, nbPlayed};
            }

            const rows = [];

            if (this.props.content != null) {
                for (let i = 0; i < data.length; i += 1) {
                    rows.push(createData(...data[i]));
                }
            }

        const { classes, columns, ...tableProps } = this.props;

            let redG = null;
            let redC = null;

            if (this.props.moyenneG !== null && this.props.moyenneClasse != null) {
                if (this.props.moyenneG < 30)
                    redG = "#b71c1c";
                else if (this.props.moyenneG < 40 && this.props.moyenneG > 30)
                    redG = "#e53935";
                else if (this.props.moyenneG < 50 && this.props.moyenneG > 40)
                    redG = "#ef5350";
                else if (this.props.moyenneG > 50 && this.props.moyenneG < 60)
                    redG = '#ff6d00';
                else if (this.props.moyenneG > 60 && this.props.moyenneG < 70)
                    redG = '#ffee58';
                else if (this.props.moyenneG > 70 && this.props.moyenneG < 80)
                    redG = '#9ccc65';
                else if (this.props.moyenneG > 80)
                    redG = "#8bc34a";

                if (this.props.moyenneClasse < 30)
                    redC = "#b71c1c";
                else if (this.props.moyenneClasse < 40 && this.props.moyenneClasse > 30)
                    redC = "#e53935";
                else if (this.props.moyenneClasse < 50 && this.props.moyenneClasse > 40)
                    redC = "#ef5350";
                else if (this.props.moyenneClasse > 50 && this.props.moyenneClasse < 60)
                    redC = '#ff6d00';
                else if (this.props.moyenneClasse > 60 && this.props.moyenneClasse < 70)
                    redC = '#ffee58';
                else if (this.props.moyenneClasse > 70 && this.props.moyenneClasse < 80)
                    redC = '#9ccc65';
                else if (this.props.moyenneClasse > 80)
                    redC = "#8bc34a";
            }

        return (
            <div>
                <div className={classes.root}>
                <Grid container spacing={24} style={{backgroundColor: '#b2ebf2'}}>
                    <Grid item xs={7} >
                        <Card className={classes.card} style={{backgroundColor: '#e0f2f1'}}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Moyennes par matières
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Toutes matières confondues
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Paper style={{ height: 400, width: '100%', backgroundColor: '#e0f7fa' }}>
                                    <AverageTab
                                        rowCount={rows.length}
                                        rowGetter={({ index }) => rows[index]}
                                        columns={[
                                            {
                                                width: 120,
                                                flexGrow: 1.0,
                                                label: 'Matière',
                                                dataKey: 'matiere',
                                            },
                                            {
                                                width: 120,
                                                label: 'Moyenne',
                                                dataKey: 'moyenne',
                                                numeric: true,
                                            },
                                            {
                                                width: 120,
                                                label: 'Moyenne classe',
                                                dataKey: 'moyenneClasse',
                                                numeric: true,
                                            },
                                            {
                                                width: 120,
                                                label: 'Parties effectuées',
                                                dataKey: 'nbPlayed',
                                                numeric: true
                                            },
                                        ]}
                                    />
                                </Paper>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <Paper className={classes.paper} style={{backgroundColor: '#4dd0e1', color: 'white', padding: '3%'}}>

                                            <h3 style={{textAlign: 'center'}}>Moyenne Générale de l'élève</h3>
                                            <Typography style={{textAlign: 'center', fontSize: '2em', color: redG}}>
                                                <CountUp
                                                    decimals={2}
                                                    end={this.props.moyenneG}
                                                />
                                            </Typography>

                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className={classes.paper} style={{backgroundColor: '#4dd0e1', color: 'white', padding: '3%'}}>

                                            <h3 style={{textAlign: 'center'}}>Moyenne Générale de la classe</h3>
                                            <Typography style={{textAlign: 'center', fontSize: '2em', color: redC}}>
                                                <CountUp
                                                    decimals={2}
                                                    end={this.props.moyenneClasse}
                                                />
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper} style={{padding: '5%'}}>
                            <AverageChart mG={this.props.moyenneG} mC={this.props.moyenneClasse}/>
                        </Paper>
                        <Paper className={classes.paper} style={{padding: '5%'}}>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            </div>
        );
    }

}

StudentStatistics.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func,
};

StudentStatistics.defaultProps = {
    headerHeight: 56,
    rowHeight: 56,
};

const mapStateToProps = state => {

    return {
        token: state.login.token,
        moyenneG: state.studentResults.moyenneG,
        moyenneClasse: state.studentResults.moyenneClasse,
        contentMatiere: state.studentResults.contentMatiere,
        contentMoyenne: state.studentResults.contentMoyenne,
        contentMoyenneClasse: state.studentResults.contentMoyenneClasse,
        contentNbPlay: state.studentResults.contentNbPlay,
        content: state.studentResults.content
    };

};

const mapDispatchToProps = dispatch => {

    return {
        getStudentsResults: (idEleve, token) => dispatch({ type: "STUDENT_RESULTS_REQUEST", idEleve, token })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentStatistics)));