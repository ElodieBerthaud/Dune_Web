import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {
    abo1,
    abo2,
    abo3
} from "./descriptions";
import AboCard from './AboCard';
import PopUp from "./popUp";

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
        textAlign: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        //fontSize: 14,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 12,
    },
    grid: {
    },
    center: {
        textAlign: 'center'
    },
    cardHeader: {
        backgroundColor: '#e0f7fa'
    },
    price: {
        color: '#00838f'
    },
    bold: {
        fontWeight: 'bold'
    }
});

class Abo extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    componentWillMount() {
        this.props.SubInfos(this.props.token);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item md={4} xs={12} className={classes.grid}>
                            <AboCard
                            name="Basique"
                            price={<p className={classes.price + ' ' + classes.bold}>0€ / Mois</p>}
                            priceMonth={0}
                            priceYear={0}
                            id={this.props.current_abo}
                            desc={abo1}
                            isActive={this.props.current_abo === 0 && this.props.status === 1}
                            isNotActive={this.props.current_abo === 0 && this.props.status === 0}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <AboCard
                                priceMonth={60}
                                priceYear={648}
                                name="Premium"
                                price={<div><p className={classes.price + ' ' + classes.bold}>60€ / mois (720€ / an) </p> <p className={classes.price}> 648€ en une fois (-10%)</p></div>}
                                id={this.props.current_abo}
                                desc={abo2}
                                isActive={this.props.current_abo === 1 && this.props.status === 1}
                                isNotActive={this.props.current_abo === 1 && this.props.status === 0}/>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <AboCard
                                priceMonth={0}
                                priceYear={0}
                                name="Premium +"
                                price={<div><p className={classes.price}>A partir de <span className={classes.bold}> 80€ / mois </span></p></div>}
                                id={this.props.current_abo}
                                desc={abo3}
                                isActive={this.props.current_abo === 2 && this.props.status === 1}
                                isNotActive={this.props.current_abo === 2 && this.props.status === 0}/>
                        </Grid>
                    </Grid>
                </div>
                <PopUp />
            </div>
        );
    }

}

Abo.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        current_abo: state.subscribe.current_abo,
        status: state.subscribe.isValid,
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        SubInfos: (token) => dispatch({ type: 'GET_SUB_INFO_REQUEST', token})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Abo)));
