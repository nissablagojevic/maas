import {
    default as React
    } from "react";


export default function About(props){
    var packageJson = `{
    "name": "maas",
        "version": "0.1.0",
        "private": true,
        "dependencies": {
        "bootstrap": "^3.3.7",
            "express-graphql": "^0.6.6",
            "graphql": "^0.10.3",
            "graphql-js-schema-fetch": "^1.1.2",
            "graphql-relay": "^0.5.2",
            "highcharts": "^5.0.12",
            "react": "^15.6.1",
            "react-dom": "^15.6.1",
            "react-highcharts": "^12.0.0",
            "react-router-dom": "next",
            "relay": "^0.8.0-1",
            "relay-runtime": "^1.1.0"
    },
    "devDependencies": {
        "react-bootstrap": "^0.30.3",
            "react-dom": "^15.6.1",
            "react-helmet": "^5.0.3",
            "react-router-bootstrap": "^0.23.2",
            "react-scripts": "1.0.10"
    },
    "scripts": {
        "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test --env=jsdom",
            "eject": "react-scripts eject"
    }
}`;
    return (
        <section>
            <h2>Package.json</h2>
            <p>
            {JSON.stringify(packageJson)}
            </p>
        </section>

    );
}
