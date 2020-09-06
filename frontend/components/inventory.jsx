import React, { Component, useState, useReducer, useEffect} from 'react'
import CreateSaleForm  from './createSaleForm';
import UserLightsaber from './user_lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllUserLightsabers": 
            return action.payload;
        default:
            return state;
    }
}

function fetchAllTheUserLightsabers (dispatch, user_id) {
    LightsaberAPIUtil.fetchUserLightsabers(user_id).then((all_lightsabers) =>  {
        dispatch({type: "fetchAllUserLightsabers", payload: all_lightsabers})
    })
};

export default function Inventory () {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);

    useEffect(() => {
        fetchAllTheUserLightsabers(dispatch, localStorageCurrentUser.id);
    }, [])
    
    const displayLightsabersForSale = state.map((lightsaber) => {
        if (lightsaber.forsale) {
            return <div><UserLightsaber lightsaber={lightsaber}/></div>;
        }
    });

    const displayLightsabersNotForSale = state.map((lightsaber) => {
        if (!lightsaber.forsale) {
            return <div><UserLightsaber lightsaber={lightsaber}/></div>;
        }
    });

    return (
        <div>
            <h1>Inventory for Sale:</h1>
            <div class="all-lightsabers-container">
                {displayLightsabersForSale}
            </div>
            
            <div class="clearfix"></div>

            <h1>Inventory Not for Sale:</h1>
            <div class="all-lightsabers-container">
                {displayLightsabersNotForSale}
            </div>

            <div class="clearfix"></div>

            <CreateSaleForm currentState={state} />
        </div>
    )
}
