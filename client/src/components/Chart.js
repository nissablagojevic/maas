import { default as React, Component } from 'react';

import Highcharts from 'highcharts';

import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.opts
    };
  }

  componentDidMount() {
    this.defineExtremes();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  defineExtremes() {
    var extremesY = Highcharts.charts[0].series[0].yAxis.getExtremes();

    var padding = 100;
    
    var setExtY = {
      min: extremesY.dataMin - padding,
      max: extremesY.dataMax + padding
    };

    Highcharts.charts[0].yAxis[0].setExtremes(setExtY.min, setExtY.max);
  }

  /**
     * Initialises chart
     */
  renderChart(config) {
    return <ReactHighcharts config={config} />;
  }

  render() {
    return (
      <div id="chart">
        {this.renderChart(this.state.options)}
      </div>
    );
  }
}

Chart.defaultProps = {
  options: {
    chart: {
      panKey: 'shift',
      height: '40%',
      panning: true,
      resetZoomButton: {
        relativeTo: 'chart'
      },
      type: 'scatter',
      zoomType: 'x'
    },
    credits: {
      enabled: false
    },
    global: {
      useUTC: false
    },
    navigator: {
      adaptToUpdatedData: false
    },
    series: [],
    subtitle: {
      text: 'Exploring MAAS collections by production date'
    },
    title: {
      text: 'Collection Timeline'
    },
    tooltip: {
      followPointer: false,
      headerFormat: '',
      shared: true,
      valueDecimals: 2,
      xDateFormat: '%d %B %Y',
      useHTML: true,
      zIndex: 100
    },
    xAxis: [
      {
        crosshair: true,
        dateTimeLabelFormats: {
          second: "%d %b '%y<br/>%H:%M:%S",
          minute: "%d %b '%y<br/>%H:%M",
          hour: "%d %b '%y<br/>%H:%M",
          day: "%d %b '%y",
          week: "%d %b '%y",
          month: "%b '%y",
          year: '%Y'
        },
        minRange: 315400000000,
        labels: {
          rotation: 0
        },
        opposite: true,
        type: 'datetime'
      }
    ],
    yAxis: {
      labels: {
        //enabled: false
      },
      minPadding: 50,
      tickAmount: 1,

      title: {
        enabled: false
      }
    }
  }
};

export default Chart;
