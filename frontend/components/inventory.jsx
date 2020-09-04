import React, { Component, useState, useReducer, useEffect} from 'react'
import CreateSaleForm  from './createSaleForm';
import Lightsaber from './lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllUserLightsabers": 
            return action.payload;
        default:
            return state;
    }
}

// function fetchAllTheUserLightsabers (dispatch) {
//     LightsaberAPIUtil.fetchUserLightsabers(user_id).then((all_lightsabers) =>  {
//         dispatch({type: "fetchAllUserLightsabers", payload: all_lightsabers})
//     })
// };

export default function Inventory () {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);

    // useEffect(() => {
    //     fetchAllTheUserLightsabers(dispatch);
    // }, [])
    
    return (
        <div>
            <div class="all-lightsabers-container">
            </div>

            <CreateSaleForm />
        </div>
    )
}
