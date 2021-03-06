import { default as React, Component } from 'react';

import ReactDOMServer from 'react-dom/server';

import Helmet from "react-helmet";

import { fetchQuery } from '../actions';

import { Chart, Item, Series } from './';

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.maas.museum/graphql',
      query: `{
  narratives(filter:{_id: 69}) {
    _id
    title
    objects(limit: 100) {
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
      options: Chart.defaultProps.options,
      collectionName: ''
    };
  }

  componentDidMount() {
    fetchQuery(this.state.url, {query: this.state.query, method: 'POST'})
        .then(json => {
          return json.data;
        })
        .then(data => {
          if (typeof data === 'object') {
            var items = this.renderItems(data);
            var collectionName = data.narratives[0].title;
            var chartConfig = this.state.options;
            this.setState({
              items: items,
              options: chartConfig,
              collectionName: collectionName
            });
          }
        });
  }

  formatSeriesData(items) {
      var thumbDims = 100;

    if (typeof items === 'object') {
        var yearData = [];
      var series = items.reduce(function (result, item) {
          var date = Date.UTC(item.props.baseTime, 0, 0);

          yearData.push(date);
          var counts = {};

          for(var i = 0; i< yearData.length; i++) {
              var num = yearData[i];
              counts[num] = counts[num] ? counts[num]+1 : 1;
          }
        var seriesData = {
            id: item.props.id,
          name: item.props.title,
          x: date,
          info: item,
          y: counts[date] * thumbDims,
            marker: {
                symbol: 'url(' + item.props.image + ')',
                height: thumbDims,
                width: thumbDims
            }
        };

        result.push(seriesData);
        return result;
      }, []);

      var seriesArray = (
          <Series data={series} name={this.state.collectionName} />
      );

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

          if (
              typeof production === 'string' && !isNaN(parseInt(production, 10))
          ) {
            production = item.production[i].date;
          } else {
            production = false;
          }
        }

        if (production !== false) {
          result.push(
              <Item
                  key={'item' + item._id}
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

  render() {
    var options = this.state.options;
    var formattedSeries = this.formatSeriesData(this.state.items);
    var collectionName = this.props.collectionName;


    if (typeof formattedSeries !== 'undefined') {
      options.series[0] = formattedSeries;
      options.tooltip.formatter = function () {

          var item = this.point || this.points[0].point;
        var tooltip = (

            <Item
                key="tooltip"
                id={item.id}
                title={item.info.props.title}
                category={item.info.props.category}
                date={item.info.props.date}
                dateEarliest={item.info.props.dateEarliest}
                dateLatest={item.info.props.dateLatest}
                image={item.info.props.image}
            />
        );
        return ReactDOMServer.renderToStaticMarkup(tooltip);
      };


      if (collectionName !== false) {
        return (
            <div>
              <Helmet
                  title={this.state.collectionName}
              />
              <Chart items={this.state.items} opts={options} />
            </div>
        );
      }
    }
    else {
      return (<div>
        <Helmet
            title="Loading..."
        />
        Chart loading...
      </div>);
    }
  }
}

export default Api;
