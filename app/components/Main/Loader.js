import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import loader from '../../images/loaders/bars-loader.gif';

const styles = {
  root: {
  },

  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden'
  },
};

class Loader extends Component {
  render() {
    const { classes } = this.props;

    return (

      <div style={{ backgroundColor: 'transparent' }}>

        <Dialog
          open={this.props.open === undefined ? false : this.props.open}
          BackdropProps={{
            classes: {
              root: classes.root
            }
          }
          }
          PaperProps={{
            classes: {
              root: classes.paper
            }
          }}
        >
          <div>
            <List>
              <img alt="loading" src={loader} />
            </List>
          </div>
        </Dialog>
      </div>

    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
