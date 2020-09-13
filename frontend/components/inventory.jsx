import React, { Component, useState, useReducer, useEffect} from 'react'
import CreateSaleForm  from './createSaleForm';
import UserLightsaber from './user_lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import UserInfo from './userInfo';
import * as UserAPIUtil from '../util/user_api_util';

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

const userReducer = (state, action) => {
    switch(action.type) {
        case "fetchUser": 
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

function fetchUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchUser", payload: current_user});
    })
}

export default function Inventory () {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);
    var [userState, userDispatch] = useReducer(userReducer);


    useEffect(() => {
        fetchAllTheUserLightsabers(dispatch, localStorageCurrentUser.id);
        fetchUser(localStorageCurrentUser.id, userDispatch);
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
            <UserInfo userState={userState}/>

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
