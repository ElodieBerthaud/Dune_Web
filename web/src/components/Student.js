import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import avatar from "../images/avatar.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';


const styles = {
    card: {
    },
    media: {
        height: 50,
    },
};

function Student(props){

    const { classes } = props;

    let eleve = [];

    let obj = JSON.parse(props.students);
    if (obj != null){

    const nbEleve = obj.length;

    for (var i = 0 ; i < nbEleve ; i++){
        eleve.push(
            <div style={{width: '20%', display: 'inline-block', margin: '1%'}} key={i}>
                <Card className={classes.card} classes={{root: classes.card}}>
                    <CardActionArea>
                        <Avatar
                            alt="Adelle Charles"
                            src={avatar}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                            style={{margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'}}
                        />
                        <CardContent>

                            <Typography gutterBottom style={{textAlign: 'center'}}>
                                {obj[i].nomEleve} {obj[i].prenomEleve}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

        return(

            <div style={{textAlign: 'center'}}>
                { eleve }
            </div>


        );

}

Student.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Student);