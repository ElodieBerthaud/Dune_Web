import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import student from "../images/student.png";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import pdf from "../images/pdf.png";
import img from "../images/img.png";
import mp4 from "../images/video.png";
import GridContainer from "./Dashboard/GridContainer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    card: {
    },
    media: {
        height: 50,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        maxWidth: 400,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

class GetCourseFiles extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    componentWillMount() {

        console.log("OKKK");
        this.props.getFiles(this.props.token);

    }

    getFilesList = () => {

        const {classes} = this.props;

        let files = [];

        let obj = JSON.parse(this.props.files);

        if (obj !== null){

            const nbFiles = obj.length;

            var id = null;
            var src = null;

            for (var i = 0; i < nbFiles; i++)
            {
                id = obj[i].idFile;
                src = obj[i].type === "IMG" ? img : obj[i].type === "PDF" ? pdf : obj[i].type === "MP4" ? mp4 : '';
                files.push(
                    <div style={{minWidth: '20%', maxWidth: '20%', display: 'inline-block', margin: '1%'}} key={i}>
                        <Card className={classes.card} classes={{root: classes.card}}>
                            <CardActionArea>

                                <div style={{margin: '0 auto', width: '40%', height: '40%', marginTop: '10%'}}>
                                    <img className={classes.img} alt="complex" src={src} />
                                </div>

                                <CardContent>

                                    <Typography gutterBottom style={{textAlign: 'center'}}>
                                        {obj[i].nom}
                                    </Typography>

                                    <Typography gutterBottom style={{textAlign: 'center', fontStyle: 'italic'}}>
                                        {obj[i].description.substring(0, 20) + '...'}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                )
            }

        }

        return files;

        console.log(this.props.files);

    }
    render() {

        const { classes } = this.props;

        return (
                    <div style={{textAlign: 'center'}}>

                        <div style={{textAlign: 'center', marginBottom: '2%'}}>
                            <h2 style={{fontStyle: 'italic'}}> Vos fichiers </h2>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="standard-name"
                                    label="Nom"
                                    className="fwfew"
                                    value={this.state.searchName}
                                    margin="normal"
                                    onChange={this.searchName}
                                    name='searchName'
                                    defaultValue=''
                                />
                            </FormControl>
                        </div>

                        {this.getFilesList()}

                    </div>
        );
    }

}

GetCourseFiles.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        token: state.login.token,
        files: state.files.files
    };

};

const mapDispatchToProps = dispatch => {

    return {
        getFiles: (token) => dispatch({ type: "GET_FILES_REQUEST", token })
    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GetCourseFiles)));