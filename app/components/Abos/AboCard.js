import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

const style = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
        minHeight: '470px',
        maxHeight:'470px',
        position: 'relative'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        //fontSize: 14,
        textAlign: 'center',
        color: '#00838f'
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
        fontSize: '1em',
        padding: '8%',
        color: '#00838f !important'
    },
    content: {
        fontSize: '1.2em',
    },
    desc: {
        lineHeight: '30px',
        color: '#00bcd4',
        minHeight: '180px',
        maxHeight: '180px'
    },
    souscrire: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        backgroundColor: '#e0f7fa'
    },
    button: {
        margin: '0 auto',
        color: '#00838f'
    }
});

class AboCard extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    Sub = () => {
        if (this.props.isActive){
            this.props.OpenPopup("cancel", this.props.name, this.props.id);
        } else if (this.props.isNotActive){
            this.props.OpenPopup("renew", this.props.name, this.props.id);
        } else {
            console.log("SUVSCRIBE");
            this.props.OpenPopup("subscribe", this.props.name, this.props.id, this.props.priceMonth, this.props.priceYear);
        }
    }

    render() {
        const classes = this.props.classes;
        let active = null;
        if (this.props.isActive){
            active = "1px 1px 2px #283593, 0 0 40px #283593, 0 0 5px #283593";
        } else if (this.props.isNotActive){
            active = "1px 1px 2px #283593, 0 0 40px #c23d4b, 0 0 5px #c23d4b";
        } else {
            active = "";
        }
        return (
            <Card classes={{root: classes.card + ' ' + classes.center}} style={{boxShadow: active}} >
                <CardContent className={classes.cardHeader}>
                    <Typography variant="h5" component="h2" className={classes.title}>
                        {this.props.name}
                    </Typography>
                </CardContent>
                <CardContent className={classes.content}>
                    <div className={classes.desc}>
                        {this.props.desc}
                    </div>
                    <Divider />
                    <div className={classes.price}>
                        {this.props.price}
                    </div>
                </CardContent>
                <CardActions className={classes.souscrire}>
                    <Button size="small" className={classes.button} onClick={() => this.Sub()}>{ this.props.isActive ? "Annuler" : (this.props.isNotActive ? "Renouveler" : "Souscrire") }</Button>
                </CardActions>
            </Card>
        );
    }

}

AboCard.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    price: PropTypes.object,
    desc: PropTypes.object,
    id: PropTypes.number,
    isActive: PropTypes.bool,
    isNotActive: PropTypes.bool
};

const mapStateToProps = state => {

    return {};

};

const mapDispatchToProps = dispatch => {

    return {
        OpenPopup: (popupContent, popupAboTitle, id, priceMonth, priceYear) => dispatch({ type: 'ABO_POPUP_OPEN', popupContent, popupAboTitle, id, priceMonth, priceYear})
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AboCard)));
