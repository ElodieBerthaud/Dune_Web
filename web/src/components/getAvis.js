import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Rater from 'react-rater';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({

});

class getAvis extends Component {

    constructor(props) {

        super(props);

        this.state = {
            commentaire: ''
        };

    }

    componentDidMount(){

        const { id } = this.props.match.params;

        this.props.getAvis(id, this.props.token);

    }

    renderAvisList = () => {

        let content = [];

        if (this.props.avis !== null){

            for (var i = 0 ; i < this.props.avis.length ; i++) {

                content.push(<div>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="" src={"http://176.31.252.134:7001/files/profs/" + this.props.avis[i].photo}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.avis[i].nomProf + ' ' + this.props.avis[i].prenomProf}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    Professeur
                                </Typography>

                                <Typography component="span" color="textPrimary">
                                    <Rater
                                        onRate={this.changeRate}
                                        total={5}
                                        rating={this.props.avis[i].note}
                                        interactive={false}
                                    />
                                </Typography>

                                <Typography component="span" color="textPrimary" style={{fontStyle: 'italic'}}>
                                    {this.props.avis[i].commentaire}

                                </Typography>

                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" />
                </div>);
            }

            if (this.props.avis.length === 0){

                content.push(<div style={{textAlign: 'center'}}>

                            Soyez le premier a laisser un avis !

                        </div>
                    );

            }

        }

        return content;

    }



    render() {
        return (
            <div>
                <List>
                    {this.renderAvisList()}
                </List>
            </div>
        );
    }

}

getAvis.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        avis: state.getAvis.contentAvis,
        token: state.login.token
    };

};

const mapDispatchToProps = dispatch => {

    return {
        getAvis: (idGame, token) => dispatch({ type: "GET_AVIS_REQUEST", idGame, token })

    };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(getAvis)));