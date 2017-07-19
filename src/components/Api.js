import {
    default as React,
    Component,
    } from "react";

import {
    Chart,
    Item,
    PlotLine,
    Series
    } from "./";



class Api extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.maas.museum/graphql',
            query: `{
  narratives(filter:{title: "Selected glass objects"}) {
    id
    title
    objects(limit: 40) {
      _id
      title
      displayTitle
      description
      category
      production {
        date
        dateLatest
        dateEarliest
      }
    }
  }
}`,
            items: 'Loading...',
            options: Chart.defaultProps.options
        };
    }

    componentDidMount() {
        this.fetchQuery(this.state.query)
            .then( (json) => {
                return json.data;
            })
            .then( (data) => {

                if(typeof data === 'object') {
                    console.log("PRE RENDER");
                    var items = this.renderItems(data);
                    var chartConfig = this.state.options;
                    console.log("CHART CONFIG ABOUT TO BE USED");
                    console.log(chartConfig);


                    console.log("SET STATE");
                    this.setState({items: items, options: chartConfig});
                    console.log(this.state);
                    console.log("END");

                }
            });
    }

    formatPlotLineData(items) {
            console.log("GET PLOTLINES");
            console.log(items);

            if(typeof items === 'object') {
                var plotLineArray = [];
                var pLs = items.reduce(function(result, item) {
                    var plotLineDate = Date.UTC(item.props.baseTime, 0, 0);
                    var plotLineId = "PLOTLINE" + item.props.id;
                    var plotLineLabel = {text: item.props.title,
                                        style: Chart.defaultProps.options.plotLines.style};
                    var plotLine = <PlotLine id={plotLineId}
                                            label={plotLineLabel}
                                            value={plotLineDate}/>;
                    result.push(
                        plotLine.props
                    );

                    return result;
                }, []);


                console.log("SHOULD HAVE A BUNCH OF PLOTLINE ELEMENTS HERE");
                console.log(pLs);

                for(var i = 0; i < pLs.length; i++) {
                    console.log(pLs[i]);
                    plotLineArray.push(pLs[i]);
                }

                return plotLineArray;
            }
    }

    formatSeriesData(items) {
        console.log("GET SERIES");
        console.log(items);

        if(typeof items === 'object') {
            var seriesArray = {};
            var seriesName = "SERIESNAME";
            var seriesId = "SERIESID";
            var series = items.reduce(function(result, item) {
                console.log("SERIES ITEM");
                console.log(item.props.baseTime);
                var seriesData = [Date.UTC(item.props.baseTime, 0, 0), 1];
                result.push(seriesData);
                return result;
            }, []);
            console.log("SERIES");
            console.log(series);
            seriesArray = <Series data={series} name={seriesName} id={seriesId}/>;

            console.log("SHOULD HAVE A SERIES ELEMENT HERE");
            console.log(seriesArray.props);

            return seriesArray.props;


        }
    }

    renderItems(data) {
        console.log("RENDER ITEMS");
        var objects = data.narratives[0].objects;
        if(objects.length > 0) {

            var items = objects.reduce(function(result, item) {
                var production;
                for (var i = 0; i < item.production.length; i++) {
                    production = item.production[i].date;
                    if (typeof production === 'string' && !isNaN(parseInt(production, 10))) {
                        production = item.production[i].date;
                    }
                    else {
                        production = false;
                    }

                }

                if(production != false) {
                    result.push(
                            <Item key={"item"+item._id}
                                id={item._id}
                                title={item.displayTitle}
                                category={item.category}
                                date={production}
                                dateEarliest={item.production.dateEarliest}
                                dateLatest={item.production.dateLatest}
                                baseTime={parseInt(production,10)}
                            />
                    );
                }
                return result;
            }, []);
            return items;
        }
    }


    fetchQuery() {
        return fetch(this.state.url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: this.state.query,
            }),
        }).then(this.handleErrors)
            .then(response => {
            return response.json() });
    }

    handleErrors(response) {
        if (!response.ok) {
            console.log("FETCH ERROR: " + response.status + ' -- ' + response.statusText);
        }
        return response;
    }

    render() {
        var options = this.state.options;
        var formattedPlotlines = this.formatPlotLineData(this.state.items);
        var formattedSeries = this.formatSeriesData(this.state.items);
        console.log(formattedSeries);

        if(typeof formattedSeries !== 'undefined') {
            options.xAxis[0].plotLines = formattedPlotlines;
            options.series[0] = formattedSeries;

            return (
                <div>
            {console.log("RENDER API")}
            {console.log(JSON.stringify(options))}

                    <Chart items={this.state.items} opts={options}/>
                    <div id="collection">
                    {this.state.items}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
            {console.log("RENDER API WITHOUT SERIES")}
                Loading chart...
                    <div id="collection">
                    {this.state.items}
                    </div>
                </div>
            );
        }



    }
}

export default Api;
