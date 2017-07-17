import {
    default as React,
    Component,
    } from "react";

import Highcharts from "highcharts";

import ReactHighcharts from "react-highcharts";


var options = {
    chart: {
        type: 'line',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        resetZoomButton: {
            relativeTo: 'chart'
        }
    },
    credits: {
        enabled: false
    },
    global: {
        useUTC: false
    },
    loading: {},
    navigator: {
        adaptToUpdatedData: false
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }],
    subtitle: {
        text: 'subtitle'
    },
    title: {
        text: 'title'
    },
    tooltip: {
        xDateFormat: '%d %B %Y',
        shared: true,
        valueDecimals: 2
    },
    xAxis: [{
        crosshair: true,
        type: 'datetime',
        minTickInterval: 24 * 3600 * 1000,
        dateTimeLabelFormats: {
            second: '%d %b \'%y<br/>%H:%M:%S',
            minute: '%d %b \'%y<br/>%H:%M',
            hour: '%d %b \'%y<br/>%H:%M',
            day: '%d %b \'%y',
            week: '%d %b \'%y',
            month: '%b \'%y',
            year: '%Y'
        },
        labels: {
            rotation: 0
        },
        opposite: true
    }]
};

class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chart: {}
        };
        console.log("CHART");
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return(
            <div id="chart"><ReactHighcharts config={options}/></div>
        );
    }
}



export default Chart;