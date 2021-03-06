import React, { Component } from 'react';
import '../../styles/Login.css';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ItemForm from './AddItemForm';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    margin: `${0} auto`,
    padding: `${30} %`,
    textAlign: 'center',
    color: theme.palette.text.primary,
    onHover: theme.palette.text.secondary,
    width: `${70}%`

  }
});


class ManageProfessor extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Card>
          <CardContent style={{ padding: '0', margin: '1%' }}>

            <h2 style={{ textAlign: 'center' }}>Ajouter un professeur</h2>
            <Paper
              className={styles.paper}
              style={{
                padding: 20, margin: `${0} auto`, width: `${70}%`, backgroundColor: '#E0F7FA'
              }}
              elevation={1}
            >
              <p className="text-center"> En tant que directeur, vous avez la possibilité d'ajouter un professeur dans la base de donnée de votre établissement.
                <br />
                                Pour effectuer cette action, vous devez remplir le formulaire ci-dessous. Le professeur sera ajouté dès que vous validerai ce formulaire.
              </p>
            </Paper>
            <ItemForm />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ManageProfessor;
