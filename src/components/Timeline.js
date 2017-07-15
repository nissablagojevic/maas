import {
    default as React,
    Component,
    } from "react";


import {
    Api,
    } from "./";

export default class Timeline extends Component {

    render() {
        return (
            <div className="Timeline">
                <Api />
                <p>This is the timeline content and homepage.</p>
             </div>
        );
    }
}
