import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

const styles = {};


const options = {
  chart: {
    title: 'Moyennes',
    subtitle: 'Visualisation des moyenens de l\'élève',
  },
  colors: ['#ff1744', '#7e57c2', '#7570b3'],
  vAxis: {
    viewWindowMode: 'explicit',
    viewWindow: {
      max: 100,
      min: 0
    }
  },
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  globalResponsive: true
};

const data = [
  ['Matières', 'Moyenne'],
  ['Mathématiques', 80],
  ['Logique', 50],
  ['Francais', 70],
  ['Toutes', 72]
];

class classCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };


    this.classesLabel = {
      1: 'Petite section',
      2: 'Moyenne Section',
      3: 'Grande section',
      4: 'CP',
      5: 'CE1',
      6: 'CE2',
      7: 'CM1',
      8: 'CM2',
      9: '6e',
      10: '5e',
      11: '4e',
      12: '3e'
    };
  }

  componentWillMount() {
  }

    createChartArray = () => {
      const tmp = [];

      this.state.data.push(['Classe', 'Moyenne']);

      if (this.props.content !== null) {
        for (let i = 0; i < this.props.content.length; i++) {
          const tmp = [];

          tmp.push(`${this.classesLabel[this.props.content[i].level]}-${this.props.content[i].num}`);
          tmp.push(this.props.content[i].moyenne);

          this.state.data.push(tmp);
        }
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.content !== prevProps.content && this.props.content !== null) {
        this.createChartArray();
      }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return true;
    }

    render() {
      return (
        <div>
          <Chart loader={'../images/loaders/bars-loader.gif'} redraw options={options} chartType="ColumnChart" width="100%" height="400px" data={this.state.data}
          />
        </div>
      );
    }
}

classCharts.propTypes = {
};

const mapStateToProps = (state) => ({
  content: state.dashboard.classesAvg
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(classCharts)));
