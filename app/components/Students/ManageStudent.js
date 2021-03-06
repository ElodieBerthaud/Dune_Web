import React, { Component } from 'react';
import '../../styles/Login.css';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ItemForm from './AddStudent';

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


class ManageStudent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Card>
          <CardContent style={{ padding: '0', margin: '1%' }}>

            <h2 style={{ textAlign: 'center' }}>Ajouter un eleve</h2>
            <Paper
              className={styles.paper}
              style={{
                padding: 20, margin: `${0} auto`, width: `${70}%`, backgroundColor: '#E0F7FA'
              }}
              elevation={1}
            >
              <p style={{ textAlign: 'text-center' }}>
                                Vous pouvez ajouter un ou plusieurs eleves dans un classe de votre etablissement. Pour cela, il vous suffit de selectionner
                                la classe dans laquelle vous voulez ajouter cet eleve, puis de rentrer les informations le concernant.
                <br />
              </p>
            </Paper>
            <ItemForm />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ManageStudent;
