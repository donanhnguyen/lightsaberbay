import React, { Component, useState, useReducer } from 'react'

export class marketplacemap extends Component {


    componentDidMount(){
        // find the `<map>` node on the DOM
        const mapDOMNode = this.refs.map;
      
        // set the map to show Austin
        const mapOptions = {
          center: {lat: 30.245332000293057, lng: -97.73852611225031}, // this is Austin
          zoom: 10
        };
      
        // wrap the mapDOMNode in a Google Map
        this.map = new google.maps.Map(mapDOMNode, mapOptions);

    }

    render() {
        return (
            <div id="map-container" ref='map'>
                
            </div>
        )
    }
}

export default marketplacemap
