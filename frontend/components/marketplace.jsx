import React, { Component, useState, useReducer, useEffect} from 'react'
import MarketplaceMap from './marketplacemap';
import Lightsaber from './lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllLightsabers": 
            return action.payload;
        default:
            return state;
    }
}

function fetchAllTheLightsabers (dispatch) {
        LightsaberAPIUtil.fetchAllLightsabers().then((all_lightsabers) =>  {
            dispatch({type: "fetchAllLightsabers", payload: all_lightsabers})
        })
    };

export default function Marketplace() {

    var [state, dispatch] = useReducer(lightsaberReducer, []);
    var [currentState, setState] = useState([]);
    
    useEffect(() => {
        fetchAllTheLightsabers(dispatch);
    }, [])

    const displayAllLightsabers = state.map((lightsaber) => (<div><Lightsaber lightsaber={lightsaber}/></div>));

    return (
        <div id="marketplace-container">
            <div class="clearfix"></div>
            <div class="filters-bar">
                Search Filters go here:
            </div>
            <div class="all-lightsabers-container">
                {displayAllLightsabers}
            </div>
            
        </div>
    )
}
