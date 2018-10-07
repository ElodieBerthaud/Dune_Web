import React, { Component } from 'react';
import "../css/Login.css";
import ItemForm from './AddItemForm.js';
import Paper from '@material-ui/core/Paper';
import loader from '../images/loaders/bars-loader.gif';

const styles = theme => ({
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
        margin : 0 + " auto",
        padding: 30 + " %",
        textAlign: 'center',
        color: theme.palette.text.primary,
        onHover: theme.palette.text.secondary,
        width: 70 + "%"

    }
});


class ManageProfessor extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div className={styles.container}>
                <h2 className="text-center">Ajouter un professeur</h2>
                <Paper className={styles.paper} style={{padding: 20, margin: 0 + " auto", width: 70+"%", backgroundColor: '#E0F7FA'}} elevation={1}>
                    <p className="text-center"> En tant que directeur, vous avez la possibilité d'ajouter un professeur dans la base de donnée de votre établissement.
                        <br />
                        Pour effectuer cette action, vous devez remplir le formulaire ci-dessous. Le professeur sera ajouté dès que vous validerai ce formulaire.
                    </p>
                </Paper>
                <ItemForm/>
            </div>
        );
    }

}

export default ManageProfessor;