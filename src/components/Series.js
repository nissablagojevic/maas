import {
    default as React
    } from "react";

function Series(props){
    console.log("SERIES SAYS HELLO");
        return(<div>HELLO</div>);

}

Series.defaultProps = {
    color: '#000',
    width: 5
};

export default Series;
