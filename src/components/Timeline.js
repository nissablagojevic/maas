import {
    default as React,
    } from "react";

import {
    Api,
    Chart
    } from "./";

function Timeline(props) {

        return (
            <div className="Timeline">
            {/*<h2>API</h2>
                <Api />*/}
                <h2>Chart</h2>
                <Chart />

            </div>
        );

}

export default Timeline;