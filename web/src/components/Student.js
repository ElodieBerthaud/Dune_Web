import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import student from "../images/student.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { Component } from 'react';


const styles = {
    card: {
    },
    media: {
        height: 50,
    },
};

class Student extends Component {

    constructor(props) {
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
    }


    goToProfile(id){

        var id_ = id;

        window.location = '/student-profile/' + id_;
    }

    renderStudents() {

        const {classes} = this.props;

        let eleve = [];

        let obj = JSON.parse(this.props.students);
        if (obj != null) {

            const nbEleve = obj.length;

            var id = null

            for (var i = 0; i < nbEleve; i++) {
                id = obj[i].idEleve;
                eleve.push(
                    <div style={{width: '20%', display: 'inline-block', margin: '1%'}} key={i}>
                        <Card className={classes.card} classes={{root: classes.card}} onClick={this.goToProfile.bind(this, id)}>
                            <CardActionArea>
                                <Avatar
                                    alt="Adelle Charles"
                                    src={student}
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

        return eleve;
    }

        render(){

            return (
                <div style={{textAlign: 'center'}}>
                    {this.renderStudents()}
                </div>
            );
        }
}

Student.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Student);