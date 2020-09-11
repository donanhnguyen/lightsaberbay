import React, { Component, useState, useReducer, useEffect} from 'react'
import CreateSaleForm  from './createSaleForm';
import UserLightsaber from './user_lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllUserLightsabers": 
            return action.payload;
        case "updateLightsaberListing":
           var newOne = state.map((lightsaber) => {
                if (lightsaber.id === action.payload.id) {
                    return action.payload;
                } else {
                    return lightsaber;
                }
            })
            return newOne;
        case "updateLightsaberListingErrors":
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

function updateLightsaberListing (lightsaber, user_id, lightsaber_id, dispatch) {
    LightsaberAPIUtil.updateUsersLightsaber(lightsaber, user_id, lightsaber_id).then( (single_lightsaber) => (
        dispatch({type: "updateLightsaberListing", payload: single_lightsaber})
    ), err => (
        dispatch({type: "updateLightsaberListingErrors", payload: err.responseJSON})
    ))
};

export default function Inventory () {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);

    useEffect(() => {
        fetchAllTheUserLightsabers(dispatch, localStorageCurrentUser.id);
    }, []);

    function displayLightsabersForSale () {
        if (state) {
            var arrayOfSabers = [];
            for (let i = 0; i < state.length; i++) {
                if (state[i].forsale) {
                    arrayOfSabers.push(state[i]);
                }
            }
            var displayArrayOfSabers = arrayOfSabers.map((lightsaber) => {
                return <UserLightsaber updateLightsaberListing={updateLightsaberListing} dispatch={dispatch} lightsaber={lightsaber}/>
            })
            return displayArrayOfSabers;
        }
    }
   
    function displayLightsabersNotForSale () {
        if (state) {
            var arrayOfSabers = [];
            for (let i = 0; i < state.length; i++) {
                if (!state[i].forsale) {
                    arrayOfSabers.push(state[i]);
                }
            }
            var displayArrayOfSabers = arrayOfSabers.map((lightsaber) => {
                return <UserLightsaber updateLightsaberListing={updateLightsaberListing} dispatch={dispatch} lightsaber={lightsaber}/>
            })
            return displayArrayOfSabers.reverse();
        }
    }

    return (
        <div>
            <h1>Inventory for Sale:</h1>
            <div class="all-lightsabers-container">
                {displayLightsabersForSale()}
            </div>
            
            <div class="clearfix"></div>

            <h1>Inventory Not for Sale:</h1>
            <div class="all-lightsabers-container">
                {displayLightsabersNotForSale()}
            </div>

            <div class="clearfix"></div>

            <CreateSaleForm currentState={state} />
        </div>
    )
}
