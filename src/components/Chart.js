import {
    default as React,
    Component,
    } from "react";

import Highcharts from "highcharts";

import {
    Item
    } from "./";

import ReactHighcharts from "react-highcharts";



class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: this.props.opts
        };


        console.log("CHART");
    }

    componentDidMount() {
        console.log("CHART MOUNTED");
        //this.defineExtremes();
    }

    componentWillUnmount() {
        this.chart.destroy();
    }



    defineExtremes() {
        console.log("defining extremes");
        console.log(this.props.options);
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
        console.log("CREATE CHART");
        return(<ReactHighcharts config={config}/>);


    }

    render() {
        return(
            <div id="chart">
            {console.log("RENDER CHART")}
            {console.log(this.state.options)}
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
            type: 'line',
            zoomType: 'x'
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
        plotLines: {
            style: {
                visibility: "hidden"
            }
        },
        series: [{
            name: 'Loading...',
            type: 'column'
        }],
        subtitle: {
            text: 'subtitle'
        },
        title: {
            text: 'title'
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            xDateFormat: '%d %B %Y'
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
            plotLines: {
                style: {
                    color: "red"
                    //visibility: "hidden"
                }
            },
            labels: {
                rotation: 0
            },
            //minTickInterval: 24 * 3600 * 1000,
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