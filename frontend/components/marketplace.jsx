import React, { Component, useState, useReducer, useEffect} from 'react'
import MarketplaceMap from './marketplacemap';
import Lightsaber from './lightsaber';
// 
export const fetchAllLightsabers = () => {
    return $.ajax({
        method: 'GET',
        url: `api/lightsabers`
    })
};

export const fetchUserLightsabers = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/lightsabers`
    })
};

export const updateLightsaber = (lightsaber, user_id, lightsaber_id) => (
    $.ajax({
        method: 'PUT',
        url: `api/users/${user_id}/lightsabers/${lightsaber_id}`,
        data: {lightsaber}
    })
);
// 

export const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllLightsabers": 
            return action.payload;
        default:
            return state;
    }
}

function fetchAllTheLightsabers (dispatch) {
        fetchAllLightsabers().then((all_lightsabers) =>  {
            dispatch({type: "fetchAllLightsabers", payload: all_lightsabers})
        })
    };

export default function Marketplace() {

    var [state, dispatch] = useReducer(lightsaberReducer, []);
    // var [currentState, setState] = useState([]);
    
    useEffect(() => {
        fetchAllTheLightsabers(dispatch);
    }, [])

    const displayAllLightsabers = state.map((lightsaber) => {
        return (
            <div>
                <Lightsaber lightsaber={lightsaber}/>
            </div>
        )
    })

    return (
        <div>
            {displayAllLightsabers}
        </div>
    )
}
