import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import student from '../../images/student.png';


const styles = {
  card: {
  },
  media: {
    height: 50,
  },
};

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.goToProfile = this.goToProfile.bind(this);
  }


  goToProfile(id) {
    const id_ = id;

    window.location = `/student-profile/${id_}`;
  }

  renderStudents() {
    const { classes } = this.props;

    const eleve = [];

    const obj = JSON.parse(this.props.students);
    if (obj != null) {
      const nbEleve = obj.length;

      let id = null;

      const classesLabel = {
        1: 'Petite section',
        2: 'Moyenne Section',
        3: 'Grande section',
        4: 'CP',
        5: 'CE1',
        6: 'CE2',
        7: 'CM1',
        8: 'CM2',
        9: '6e',
        10: '5e',
        11: '4e',
        12: '3e'
      };

      for (let i = 0; i < nbEleve; i++) {
        id = obj[i].idEleve;
        eleve.push(
          <div style={{ width: '20%', display: 'inline-block', margin: '1%' }} key={i}>
            <Card className={classes.card} classes={{ root: classes.card }} onClick={this.goToProfile.bind(this, id)}>
              <CardActionArea>
                <Avatar
                  alt="Adelle Charles"
                  src={obj[i].picPath ? 'http://' + api_url_dev + '/files/eleves/' + obj[i].picPath : student}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                  style={{
                    margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'
                  }}
                />
                <CardContent>

                  <Typography gutterBottom style={{ textAlign: 'center' }}>
                    {obj[i].nomEleve} {obj[i].prenomEleve}
                  </Typography>

                  <Typography gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {classesLabel[obj[i].level]} {obj[i].num}
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
      }
    }

    if (eleve.length === 0) {
      return <div>Aucun resultat trouve pour votre recherche.</div>;
    }
    return eleve;
  }

  render() {
    console.log(api_url_dev);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.renderStudents()}
      </div>
    );
  }
}

Student.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Student);
