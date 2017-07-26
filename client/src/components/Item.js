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
