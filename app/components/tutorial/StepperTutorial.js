import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//dialog
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

//Stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

//resources
import dashboardImg from '../../images/dashboard.png';
import store from '../../images/logitheque.png';

const style = theme => ({
    root: {
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    center: {
        textAlign: 'center'
    },
    StepsActions: {
        padding: '5%',
        textAlign: 'center'
    },
    images: {
        width: '50%'
    },
    imageContainer: {
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold'
    },
    texts: {
        padding: '5%'
    }
});

class StepperTutorial extends Component {

    constructor(props) {

        super(props);

        this.state = {
            activeStep: 0,
        };

    }

    getSteps = () => {
        let cats = ['Bienvenue sur Dune.', 'Dashboard', 'Consulter les élèves', 'Logithèque', 'Gérer les cours', 'Ajouter des élèves'];
        if (this.props.director)
            cats += ['Ajouter des professeurs', 'Abonnements', 'Facturation'];
        return cats;

    }

    getStepContent = () => {
        switch (this.state.activeStep) {
            case 0:
                return <DialogContentText className={this.props.classes.center + ' ' + this.props.classes.texts}>
                    <p>Bonjour {this.props.name + ' ' + this.props.lastname}, vous êtes sur le point d'utiliser la plateforme Dune pour la premiere fois.</p>
                    <p>Afin de vous épauler dans son utilisation, nous vous avons préparé ce petit tutoriel, afin que vous puissiez commencer facilement !</p>
                    <p>Ne vous inquiétez pas, ce ne sera pas long. Il s'agit d'un tutoriel qui va vous expliquer ce que vous pouvez faire sur cette plateforme.
                    Vous allez y découvrir tous les outils que nous avons développer pour que vous puissiez gérer au mieux votre travail sur la table.</p>
                    <p>Tout au long de la procédure, il vous suffira de cliquez sur «Suivant» ou «Précédent», pour vous déplacer dans le tutoriel.</p>
                    <p>Mais attention ! Cette aide n'apparaîtra qu'une seule fois. Une fois que vous aurez cliqué sur «Terminé», vous n'aurai plus la possibilité de la revoir.
                    Mais pas de panique, notre support est disponible 5j/7 de 9h à 19h si vous avez des questions.</p>
                    <p>Vous êtes prêt ? Cliquez sur «Suivant».</p>
                </DialogContentText>;
            case 1:
                return <DialogContent classes={{root: this.props.classes.imageContainer}}>
                            <img className={this.props.classes.images} src={dashboardImg}></img>
                            <DialogContentText>
                                <p>Le «Dashboard» est la première page sur laquelle  vous serez envoyé lors de votre connexion. C'est une
                                    <span className={this.props.classes.bold}> page d'accueil.</span></p>
                                <p>C'est sur cette page que vous serez en mesure d'avoir <span className={this.props.classes.bold}> une vue globale
                                de votre gestion de compte.</span></p>
                                <p>Vous y retrouverez des <span className={this.props.classes.bold}> tableaux statistiques sur vos classes et sur vos élèves (Moyennes) </span></p>
                                <p>Vous aurez aussi accès à des données comme <span className={this.props.classes.bold}> le nombre de vos élèves, d'exercices possédés et de sessions effectuées.</span></p>
                                {
                                    this.props.director ?
                                    <p>En tant que directeur, vous avez accès à un panel tout en bas, <span className={this.props.classes.bold}> qui vous permet de gérer vos demamndes d'achats d'application plus rapidement </span></p>
                                    : ''
                                }
                            </DialogContentText>
                        </DialogContent>;
            case 2:
                return <DialogContent classes={{root: this.props.classes.imageContainer}}>
                    <img className={this.props.classes.images}></img>
                    <DialogContentText>
                        <p>Le «Trombinoscope» vous permettra de consulter le profil de vos élèves et leurs statistiques. Vous y trouverez <span className={this.props.classes.bold}>  un panel
                            complet avec les moyennes de l'elèves sur chaque matière / cathégorie d'éxercice. </span></p>

                    </DialogContentText>
                </DialogContent>;
            case 3:
                return <DialogContent classes={{root: this.props.classes.imageContainer}}>
                    <img className={this.props.classes.images} src={store}></img>
                    <DialogContentText>
                        <p>La «Logitèque» ou le store, est un espace marchand qui vous permettra <span className={this.props.classes.bold}>
                            {this.props.director ? 'd\'acheter des applications.' :
                                'Faire des demande d\'acquisition d\'applications à votre directeur.'}</span></p>
                        <p> Pour {this.props.director ? 'acheter' : "faire une demande"}, cliquez sur l'application que vous souhaitez posséder.
                            Vous serez ensuite redirigé vers la page descriptive de l'application, et vous pourrez voir sa notation et ses avis,
                            pour vous permettre de faire votre choix.</p>
                        <p> Pour {this.props.director ? "acheter l'application, cliquez sur «acheter». Vous serez dirigé sur une page de paiment" :
                            'faire la demande de l\'application, cliquez sur «demander l\'application» et laissez-vous guider.'}</p>
                    </DialogContentText>
                </DialogContent>;
            case 4:
            return <DialogContent classes={{root: this.props.classes.imageContainer}}>
                <img className={this.props.classes.images} src={store}></img>
                <DialogContentText>
                    <p>La «Logitèque» ou le store, est un espace marchand qui vous permettra <span className={this.props.classes.bold}>
                        {this.props.director ? 'd\'acheter des applications.' :
                            'Faire des demande d\'acquisition d\'applications à votre directeur.'}</span></p>
                    <p> Pour {this.props.director ? 'acheter' : "faire une demande"}, cliquez sur l'application que vous souhaitez posséder.
                        Vous serez ensuite redirigé vers la page descriptive de l'application, et vous pourrez voir sa notation et ses avis,
                        pour vous permettre de faire votre choix.</p>
                    <p> Pour {this.props.director ? "acheter l'application, cliquez sur «acheter». Vous serez dirigé sur une page de paiment" :
                        'faire la demande de l\'application, cliquez sur «demander l\'application» et laissez-vous guider.'}</p>
                </DialogContentText>
            </DialogContent>;
            default:
                return 'Unknown stepIndex';
        }
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {

        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <DialogContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </DialogContent>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                            <div className={classes.StepsActions}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}
                                >
                                    Précédent
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}

StepperTutorial.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        director: state.login.director,
        lastname: state.user.lastname,
        name: state.user.name
    };

};

const mapDispatchToProps = dispatch => {

    return {};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(StepperTutorial)));
