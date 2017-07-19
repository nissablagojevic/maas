import {
    default as React
    } from "react";

function Item(props){

        return (
            <button className="item-tile" id={'itemTile' + props.id}>
                <a className="item-tile__image-holder">
                    <div className="tile-image-tag">{props.category}</div>
                    <div className="maas-image object-image is-loaded has-aspect-ratio">
                        <img src="https://placekitten.com/200/140" alt="Item name"/>
                    </div>
                </a>
                <div className="tile-info tile-info--is-breakout">
                    <div className="tile-info__body">
                        <h2 className="tile-info__title">
                        {props.title}
                        </h2>
                        <p>{props.date}</p>
                        <p>{props.dateEarliest}</p>
                        <p>{props.dateLatest}</p>
                        <div className="hidden">
                            {props.id}
                        </div>
                    </div>
                </div>
            </button>
        );

}

export default Item;
