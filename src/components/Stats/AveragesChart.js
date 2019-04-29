import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Chart from "react-google-charts";
import PropTypes from 'prop-types';

const styles = {

}

var data = [
    ['Matières', 'Élève', 'Classe', { role: 'style' } ],
    ['Mathématiques', 1000, 400],
    ['Logique', 1170, 460],
    ['Francais', 660, 1120],
    ['Toutes', '', '']
];

var options = {
    chart: {
        title: 'Moyennes',
        subtitle: 'Visualisation des moyenens de l\'élève',
    },
    bars: 'horizontal', // Required for Material Bar Charts.
    colors: ['#ff1744', '#7e57c2', '#7570b3']
};

class AveragesChart extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: []
        };

    }

    createChartArray = () => {

        const content = this.props.content;
        let tmp = [];

        this.state.data.push(['Matières', 'Élève', 'Classe']);

        if (this.props.content !== null) {

            for (var i = 0; i < content.length; i++) {

                let tmp = [];

                tmp.push(content[i][0]);
                tmp.push(content[i][1]);
                tmp.push(content[i][2]);

                this.state.data.push(tmp);
            }
        }

        this.state.data.push(["Toutes", this.props.mG, this.props.mC]);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.createChartArray();

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.state.data = [];
        return true;
    }

    render() {
        return (
            <div>
                <Chart loader={"../images/loaders/bars-loader.gif"} options={options} chartType="Bar" width="100%" height="400px" data={this.state.data} />
            </div>
        );
    }

}

AveragesChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        content: state.studentResults.content
    };

};

const mapDispatchToProps = dispatch => {

    return {};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AveragesChart)));