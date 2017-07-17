import {
    default as React,
    Component
    } from "react";

import {
    Item
    } from "./";

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: this.props.amount,
            result: this.props.result,
            collection: this.props.collection,
            items: []
        };
    }

    componentDidMount() {
        var items = this.renderItems(this.state.collection);
        this.setState({items: items});
    }


    renderItems(collection) {
        var collectionArray = JSON.parse(collection);

        var items = collectionArray.map(function(item, k){
            return (<Item key={item._id} value={item._id}/>);
        });

        return items;
    }


    render() {
        return (
            <div className="collection">
            {this.props.collection}
                <h4>Items</h4>
                    {this.state.items}
            </div>
        );
    }

}

export default Collection;