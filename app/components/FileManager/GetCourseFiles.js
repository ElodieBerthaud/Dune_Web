import React, { Component } from 'react';
import '../../styles/Login.css';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { css } from 'emotion';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import mp4 from '../../images/video.png';
import img from '../../images/img.png';
import pdf from '../../images/pdf.png';
import ManageFiles from './ManageFiles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: '',
    },
  },
  cssFocused: {
    color: '',
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#ffd600',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#ffd600',
    },
  },
  notchedOutline: {
    '&$cssFocused': {
      color: '#ffd600',
    },
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },

  formControl: {
    margin: theme.spacing.unit * 3
  },
  filter: {
    margin: '3% auto',
    marginTop: 0
  },
  filesList: {
    minWidth: '20%',
    maxWidth: '20%',
    display: 'inline-block',
    margin: '1%'
  },
  textCenter: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic',
    textAlign: 'center'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
});

class GetCourseFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {

      recherche: '',
      fileTypePdf: false,
      fileTypeMp4: false,
      fileTypeImage: false,
      classement: 1,
      private: false,
      manage: false,
      manageId: null,
      fileTitre: null,
      fileDesc: null,
      fileOwner: null,
      filePrivate: null
    };
  }

  componentWillMount() {
    this.props.getFiles(this.props.token, this.state.private, '', [], 1);
  }

    handleChange = (event, value) => {
      if (event.target.name !== 'recherche') this.setState({ [event.target.name]: event.target.value }, this.searchFilters);
      else this.setState({ [event.target.name]: event.target.value });
    };

    openManage = (id, nom, desc, owner, privateF) => {
      let ownerB = null;

      ownerB = this.props.idUser === owner;

      this.setState({
        manage: true, manageId: id, fileTitre: nom, fileDesc: desc, fileOwner: ownerB, filePrivate: privateF
      });
    };

    updateOpened = (manage) => {
      this.setState({ manage });
    }

    searchFilters = () => {
      this.setState({ open: false });
      const typesFile = [];

      if (this.state.fileTypeImage === 'true') {
        const tmp = [];
        tmp.push('IMG');
        typesFile.push(tmp);
      } if (this.state.fileTypePdf === 'true') {
        const tmp = [];
        tmp.push('PDF');
        typesFile.push(tmp);
      } if (this.state.fileTypeMp4 === 'true') {
        const tmp = [];
        tmp.push('MP4');
        typesFile.push(tmp);
      }

      this.props.getFiles(this.props.token, this.state.private, this.state.recherche, typesFile, this.state.classement);
    }

    getFilesList = () => {
      const { classes } = this.props;

      const files = [];

      const obj = JSON.parse(this.props.files);

      if (obj !== null) {
        const nbFiles = obj.length;

        let id = null;
        let src = null;

        for (let i = 0; i < nbFiles; i++) {
          id = obj[i].idFile;
          src = obj[i].type === 'IMG' ? img : obj[i].type === 'PDF' ? pdf : obj[i].type === 'MP4' ? mp4 : '';
          files.push(
            <div className={classes.filesList} key={i}>
              <Card
                className={classes.card}
                classes={{ root: classes.card }}
                onClick={this.openManage.bind(this, id,
                  obj[i].nom,
                  obj[i].description,
                  obj[i].idUser,
                  obj[i].private)}
              >
                <CardActionArea>

                  <div>
                    <img className={classes.img} alt="complex" src={src} />
                  </div>

                  <CardContent>

                    <Typography gutterBottom className={classes.textCenter}>
                      {obj[i].nom}
                    </Typography>

                    <Typography gutterBottom className={classes.italic}>
                      {`${obj[i].description.substring(0, 20)}...`}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        }
        if (nbFiles === 0) {
          files.push(<div className="textCenter" key={1}>
            <h2>Aucun fichier ne correspond à votre recherche. Pour ajouter un fichier sur le cloud, veuillez vous rendre dans l'onglet "Ajouter".</h2>
                     </div>);
        }
      }

      return files;
    }

    handleCheck = (event, value) => {
      this.setState({ [event.target.name]: event.target.checked }, this.searchFilters);
    };

    render() {
      const { classes } = this.props;

      return (
        <div>
          <div className={classes.root}>
            <Paper className={classes.filter}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <TextField
                        className={classes.margin}
                        InputLabelProps={{
                          FormLabelClasses: {
                            root: css`
                                                  &.focused {
                                                    color: #ffd600;
                                                  }
                                                `,
                            focused: 'focused'
                          }
                        }}
                        InputProps={{
                          classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                          },
                          startAdornment: <InputAdornment position="end">
                            <Search>
                            </Search>
                          </InputAdornment>
                        }}
                        label="Rechercher par titre..."
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={this.state.recherche}
                        name="recherche"
                        onChange={this.handleChange}
                      />
                    )}
                  />

                  <FormControlLabel
                    control={(
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.margin}
                        onClick={this.searchFilters}
                      >
                                            Rechercher
                      </Button>
                    )}
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Type de fichier</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={this.state.fileTypePdf === 'true'}
                        onChange={this.handleChange}
                        value={this.state.fileTypePdf === 'true' ? 'false' : 'true'}
                        color={'secondary'}
                        name={'fileTypePdf'}
                      />
                    )}
                    label="PDF"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={this.state.fileTypeMp4 === 'true'}
                        onChange={this.handleChange}
                        value={this.state.fileTypeMp4 === 'true' ? 'false' : 'true'}
                        color={'secondary'}
                        name={'fileTypeMp4'}
                      />
                    )}
                    label="MP4"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={this.state.fileTypeImage === 'true'}
                        onChange={this.handleChange}
                        value={this.state.fileTypeImage === 'true' ? 'false' : 'true'}
                        color={'secondary'}
                        name={'fileTypeImage'}
                      />
                    )}
                    label="Image"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Trier par</FormLabel>
                <FormGroup>

                  <FormControlLabel
                    control={(
                      <Radio
                        checked={parseInt(this.state.classement) === 1}
                        onChange={this.handleChange}
                        value={1}
                        name="classement"
                        aria-label="A"
                      />
                    )}
                    label="Type"
                  />
                  <FormControlLabel
                    control={(
                      <Radio
                        checked={parseInt(this.state.classement) === 2}
                        onChange={this.handleChange}
                        value={2}
                        name="classement"
                        aria-label="B"
                      />
                    )}
                    label="Nom"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Privés / Partagés</FormLabel>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={this.state.private}
                      value={this.state.showPrivate}
                      name="private"
                      onChange={this.handleCheck}
                    />
                  )}
                  label="Privés seulements"
                />
              </FormControl>
            </Paper>
          </div>
          <div className="textCenter">
            {this.getFilesList()}
          </div>

          <ManageFiles
            manage={this.state.manage}
            id={this.state.manageId}
            titre={this.state.fileTitre}
            desc={this.state.fileDesc}
            owner={this.state.fileOwner}
            updateOpened={this.updateOpened}
            private={this.state.filePrivate === 1}
          />

        </div>
      );
    }
}

GetCourseFiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
  files: state.files.files,
  idUser: state.login.idUser
});

const mapDispatchToProps = (dispatch) => ({
  getFiles: (token, filesPrivate, title, typeF, classement) => dispatch({
    type: 'GET_FILES_REQUEST', token, filesPrivate, title, typeF, classement
  })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GetCourseFiles)));
