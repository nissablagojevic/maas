import {
    default as React,
    Component,
    } from "react";


export default class Api extends Component {

    constructor() {
        super();
        this.state = {
            url: 'https://api.maas.museum/graphql',
            query: '{objects(limit:20){_id}}',
            result: '',
        };
    }

    componentDidMount() {
        var another = this.fetchQuery(this.state.query);
        console.log(another);
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
            return response.json() })
            .then( (json) => {
                this.setState({result: JSON.stringify(json)});
            });
    }

    handleErrors(response) {
        console.log(response);
        if (!response.ok) {
            console.log("FETCH ERROR: " + response.status + ' -- ' + response.statusText);
        }
        return response;
    }

    render() {
        return (
            <div className="json">
                <p >{this.state.query}</p>
                <p>{this.state.result}</p>
            </div>
        );
    }
}


