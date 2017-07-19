import {
    default as React,
    Component,
    } from "react";

import ReactDOMServer from 'react-dom/server';

import {
    Chart,
    Item,
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
      images(limit:1) {
        url(width: 200, height: 200)
        }
    }
  }
}`,
            items: '',
            options: Chart.defaultProps.options
        };
    }

    componentDidMount() {
        this.fetchQuery(this.state.query)
            .then((json) => {
                return json.data;
            })
            .then((data) => {

                if (typeof data === 'object') {
                    var items = this.renderItems(data);
                    var chartConfig = this.state.options;
                    this.setState({items: items, options: chartConfig});
                }
            });
    }

    formatSeriesData(items) {
        if (typeof items === 'object') {
            var series = items.reduce(function (result, item) {

                var seriesData = {
                    name: item.props.title,
                    id: item.props.id,
                    x: Date.UTC(item.props.baseTime, 0, 0),
                    info: item,
                    y: 1
                };

                result.push(seriesData);
                return result;
            }, []);

            var seriesArray = <Series data={series}/>;

            return seriesArray.props;
        }
    }

    renderItems(data) {
        var objects = data.narratives[0].objects;

        if (objects.length > 0) {

            var items = objects.reduce(function (result, item) {
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

                if (production !== false) {
                    result.push(
                        <Item key={"item" + item._id}
                            id={item._id}
                            title={item.title}
                            category={item.category}
                            date={production}
                            dateEarliest={item.production.dateEarliest}
                            dateLatest={item.production.dateLatest}
                            baseTime={parseInt(production, 10)}
                            image={item.images[0].url}
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
                query: this.state.query
            })
        }).then(this.handleErrors)
            .then(response => {
                return response.json()
            });
    }

    handleErrors(response) {
        if (!response.ok) {
            console.log("FETCH ERROR: " + response.status + ' -- ' + response.statusText);
        }
        return response;
    }

    render() {
        var options = this.state.options;
        var formattedSeries = this.formatSeriesData(this.state.items);

        if (typeof formattedSeries !== 'undefined') {
            options.series[0] = formattedSeries;
            options.tooltip.formatter = function () {
                var tooltip = <Item key="tooltip"
                    id={this.point.id}
                    title={this.point.info.props.title}
                    category={this.point.info.props.category}
                    date={this.point.info.props.date}
                    dateEarliest={this.point.info.props.dateEarliest}
                    dateLatest={this.point.info.props.dateLatest}
                    image={this.point.info.props.image}
                />;
                return ReactDOMServer.renderToStaticMarkup(tooltip);
            };

            return (
                <div>
                    <Chart items={this.state.items} opts={options}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    Chart loading...
                </div>
            );
        }

    }
}

export default Api;
