import {
    default as React,
    Component,
    } from "react";

import {
    Collection
    } from "./";



class Api extends Component {

    constructor() {
        super();
        this.state = {
            url: 'https://api.maas.museum/graphql',
            query: `{ objects(limit: 20)
                        {
                            _id
                            displayTitle
                            category
                            production {
                                date
                                dateEarliest
                                dateLatest
                            }
                        } }`,
            result: '',
            limit: 20,
            collection: 'Loading...',
            items: 'Loading...'
        };
    }

    componentDidMount() {
        this.fetchQuery(this.state.query)
            .then( (json) => {
                return json.data;
            })
            .then( (data) => {

                if(typeof data === 'object') {
                        this.setState({
                            result: JSON.stringify(data),
                            collection: this.renderCollection(data)},
                            console.log('state set'));

                }
            })
            .then( () => {
                console.log("END");
            });
    }

    renderCollection(data) {
        var objects = data.objects;
        if(objects.length > 0) {
            var collection = objects.map(function (item, k) {
                return (item);
            });
            return(<Collection amount={this.state.limit} result={this.state.result} collection={JSON.stringify(collection)}/>);
        }
    }

    createQuery() {
        var query = this.state.query;


        return query;
    }

    fetchQuery(
        operation,
        variables,
        cacheConfig,
        uploadables,
    ) {
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
        return (
            <div className="json">
                <h3>Query</h3>
                <p >{this.state.query}</p>
                <h3>Result</h3>
                <p>{this.state.result}</p>
                <h3>Collection</h3>
                {this.state.collection}
            </div>
        );
    }
}

export default Api;
