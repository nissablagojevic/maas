import {
    default as React,
    Component,
    } from "react";

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    buildSchema
    } from 'graphql';


export default class Api extends Component {
    constructor() {
        super();
        this.state = {
            query: '{ objects }',
            result: 'None yet',
        };
    }

    querySchema() {
        var schema = buildSchema(`
            type Query {
                objects: String
            }
        `);

        var root = {
            objects: () => {
                return 'Hello world!';
            },
        };

        graphql(schema, this.state.query, root).then(result => {

            // Prints
            // {
            //   data: { objects: "world" }
            // }
            this.setState({result: result.data.objects});
        });


    }


    render() {
        return (
            <div className="json">
                <p onClick={() => this.querySchema()}>{this.state.query}</p>
                <p>{this.state.result}</p>
            </div>
        );
    }
}


