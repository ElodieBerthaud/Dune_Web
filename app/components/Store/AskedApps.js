import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Notificationreport from '../Notifications/NotificationReport';


const styles = {
  card: {
  },
  media: {
    height: 50,
  },
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id, name, calories, fat, carbs, protein
  };
}

const rows = [
  createData('App1', '18/11/2018', 'En attente'),
  createData('App2', '15/11/2018', 'Approuve'),
  createData('App3', '06/11/2018', 'Approuve'),
  createData('App4', '30/10/2018', 'Approuve'),
  createData('App5', '05/10/2018', 'Refuse'),
];

class AskedApps extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Notificationreport style={{ margin: '0 auto' }} size={12} />
      </div>
    );
  }
}

AskedApps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AskedApps);
