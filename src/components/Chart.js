import {
    default as React,
    Component,
    } from "react";

import Highcharts from "highcharts";

import ReactHighcharts from "react-highcharts";

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
        var maxSeriesData = this.props.options.series[0].data.length - 1;

        var extremes = Highcharts.charts[0].series[0].xAxis.getExtremes();

        var setExt = {
            min: this.props.options.series[0].data[0][0],
            max: this.props.options.series[0].data[maxSeriesData][0]
        };

        //i want to set it to the largest min and the smallest max for init
        if (extremes.max < setExt.max) {
            setExt.max = extremes.max;
        }
        if (extremes.min > setExt.min) {
            setExt.min = extremes.min;
        }

        Highcharts.charts[0].xAxis[0].setExtremes(
            setExt.min,
            setExt.max
        );
    }

    /**
     * Initialises chart
     */
    renderChart(config) {
        return (<ReactHighcharts config={config}/>);
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
            panning: true,
            resetZoomButton: {
                relativeTo: 'chart'
            },
            type: 'column',
            zoomType: 'x',
            events: {
                load: function () {
                    //this.myTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
                }
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
        plotOptions: {
            series: {
                borderWidth: 0,
                cursor: 'pointer',
                events: {
                    click: function (evt) {
                        //this.chart.myTooltip.refresh(evt.point, evt);
                    }
                },
                pointWidth: 10,
                point: {
                    events: {
                        click: function () {
                            console.log('value: ' + this.x);
                        }
                    }
                },
                stickyTracking: false
            }
        },
        series: [{
            type: 'column'
        }],
        subtitle: {
            text: 'subtitle'
        },
        title: {
            text: 'title'
        },
        tooltip: {
            followPointer: false,
            headerFormat: '',
            shared: false,
            valueDecimals: 2,
            xDateFormat: '%d %B %Y',
            useHTML: true,
            zIndex: 100
        },
        xAxis: [{
            crosshair: true,
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
            opposite: true,
            type: 'datetime',
        }],
        yAxis: {
            min: 0,
            max: 1,
            tickAmount: 0

        }
    }
};


export default Chart;