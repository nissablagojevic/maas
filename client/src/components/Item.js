import { default as React } from 'react';

import './Item.css';

function Item(props) {
  var title = props.title || 'Untitled';
  return (
    <button
      className="item-tile"
      id={'itemTile' + props.id}
    >
      <div className="tile-image-tag">
        {props.category}
      </div>
      {props.name}
      <a className="item-tile__image-holder" href={props.image}>
        <div className="maas-image object-image is-loaded has-aspect-ratio">
          <img src={props.image} alt={title} style={{ width: 200, height: 200 }} />
        </div>
      </a>
      <div className="tile-info tile-info--is-breakout">
        <div className="tile-info__body">
          <h3>
            {title}
          </h3>
          <p>
            {props.date}
          </p>
          <p>
            {props.dateEarliest}
          </p>
          <p>
            {props.dateLatest}
          </p>
          <div className="hidden">
            {props.id}
          </div>
        </div>
      </div>
    </button>
  );
}

export default Item;