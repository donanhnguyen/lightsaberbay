import React, {useReducer, useState} from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import * as UserAPIUtil from '../util/user_api_util';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

function buyLightsaber (lightsaber, lightsaber_id, dispatch) {
    LightsaberAPIUtil.buyLightsaber(lightsaber, lightsaber_id).then( (single_lightsaber) => (
        dispatch({type: "buyLightsaber", payload: single_lightsaber})
    ), err => (
        dispatch({type: "buyLightsaberErrors", payload: err.responseJSON})
    ));
}
export default function cart() {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);
    
    return (
        <div id='cart'>
            cart here

        </div>
    )
}
