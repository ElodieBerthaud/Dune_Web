import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Rater from 'react-rater';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({

});

function getDate(timestamp) {
  const ts = new Date(timestamp);

  return ts.toLocaleString();
}

class getAvis extends Component {
  constructor(props) {
    super(props);

    // this.lastContent = [];

    this.state = {
      commentaire: '',
      id: null,
      loadMore: false,
      render: false,
      lastContent: []
    };
  }

  componentDidMount() {
    this.setState({ lastContent: [] });

    const { id } = this.props.match.params;

    this.state.id = id;

    this.props.getAvis(id, this.props.token, 0);
  }


  componentWillUnmount() {
    this.setState({ lastContent: [] });

    this.state.lastContent = [];
  }

    getAvis = () => {
      const { id } = this.props.match.params;

      this.state.id = id;

      this.props.getAvis(id, this.props.token, this.props.lastNbAvis);

      this.state.loadMore = true;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      if (nextProps.avis !== this.props.avis) {
        return true;
      }
      return false;
    }

    renderAvisList = () => {
      const contentToReturn = [];

      if (this.props.avis !== null) {
        if (this.props.avis.length === 0) {
          contentToReturn.push(<div style={{ textAlign: 'center' }}>

                        Soyez le premier à laisser un avis !

                               </div>
          );
        } else {
          for (let i = 0; i < this.props.avis.length; i++) {
            this.state.lastContent.push(
              <div key={i}>
                <ListItem alignitems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt=""
                      src={`https://api.dune-table.com/files/profs/${this.props.avis[i].photo}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${this.props.avis[i].nomProf} ${this.props.avis[i].prenomProf}`}
                    secondary={(
                      <React.Fragment>
                        <Typography component="span" color="textPrimary">
                          { getDate(this.props.avis[i].date) }
                        </Typography>

                          <Rater
                              onRate={this.changeRate}
                              total={5}
                              rating={this.props.avis[i].note}
                              interactive={false}
                          />

                          <Typography component="span" color="textPrimary" style={{ fontStyle: 'italic' }}>

                            {this.props.avis[i].commentaire}

                          </Typography>

                      </React.Fragment>
                    )}
                  />

                </ListItem>
                <Divider variant="inset" />
              </div>
            );
          }

          contentToReturn.push(this.state.lastContent);

          if (this.state.lastContent.length < this.props.nbAvis) {
            contentToReturn.push(
              <div style={{ textAlign: 'center', margin: '5%' }} key={-1}>
                <Button variant="contained" color="primary" onClick={this.getAvis}>
                                Charger plus d'avis
                </Button>
              </div>
            );
          }
        }
      }

      return contentToReturn;
    }


    render() {
      return (
        <div>
          <List id="renderAvisList">
            {this.renderAvisList()}
          </List>
        </div>
      );
    }
}

getAvis.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  avis: state.getAvis.contentAvis,
  token: state.login.token,
  nbAvis: state.getAvis.nbAvis,
  lastNbAvis: state.nbAvis.lastNbAvis
});

const mapDispatchToProps = (dispatch) => ({
  getAvis: (idGame, token, depart) => dispatch({
    type: 'GET_AVIS_REQUEST', idGame, token, depart
  }),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(getAvis)));
