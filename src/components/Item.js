import {
    default as React,
    } from "react";

function Item(props) {
    return (
        <button className="item">
            {props.value}
        </button>
    );
}

export default Item;
