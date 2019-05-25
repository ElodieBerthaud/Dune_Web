import React, { Component } from 'react';
import '../../styles/Login.css';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';
import AddCourseFile from './AddCourseFile';
import GetCourseFiles from './GetCourseFiles';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      idStudent: null
    };
  }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const classes = this.props;

      return (
        <div>
          <Card className={classes.card} classes={{ root: classes.card }}>
            <h1 style={{ textAlign: 'center' }}>Gestion de cours</h1>
            <CardContent style={{ padding: '0', margin: '1%' }}>
              <Paper className={classes.root} style={{ backgroundColor: 'rgb(255, 255, 246)' }}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  centered
                >
                  <Tab label="Gerer" />
                  <Tab label="Ajouter" />
                </Tabs>
              </Paper>

              {this.state.value === 0 && <TabContainer><GetCourseFiles /></TabContainer>}
              {this.state.value === 1 && <TabContainer><AddCourseFile /></TabContainer>}

            </CardContent>
          </Card>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

Class.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Class));
