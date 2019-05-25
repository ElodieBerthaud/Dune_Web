import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';

const styles = {

};

const data = [
  ['Matières', 'Élève', 'Classe', { role: 'style' }],
  ['Mathématiques', 1000, 400],
  ['Logique', 1170, 460],
  ['Francais', 660, 1120],
  ['Toutes', '', '']
];

const options = {
  chart: {
    title: 'Moyennes',
    subtitle: 'Visualisation des moyennes de l\'élève',
  },
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      max: 100,
      min: 0
    }
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
      const tmp = [];

      this.state.data.push(['Matières', 'Élève', 'Classe']);

      if (this.props.content !== null) {
        for (let i = 0; i < content.length; i++) {
          const tmp = [];

          tmp.push(content[i][0]);
          tmp.push(content[i][1]);
          tmp.push(content[i][2]);

          this.state.data.push(tmp);
        }
      }

      this.state.data.push(['Toutes', this.props.mG, this.props.mC]);
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
          <Chart loader={'../images/loaders/bars-loader.gif'} options={options} chartType="Bar" width="100%" height="400px" data={this.state.data} />
        </div>
      );
    }
}

AveragesChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  content: state.studentResults.content
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AveragesChart)));
