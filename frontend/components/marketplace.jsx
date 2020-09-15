import React, { Component, useState, useReducer, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Lightsaber from './lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import * as UserAPIUtil from '../util/user_api_util';
import UserInfo from './userInfo';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
        case "fetchAllLightsabers": 
            return action.payload;
        case "unmountAllLightsabers": 
            return [];
        case "buyLightsaber":
            var newState = [];
            for (let i=0; i<state.length; i++) {
                if (state[i].id !== action.payload.id) {
                    newState.push(state[i]);
                }
            }
            return newState;
        default:
            return state;
    }
}

const userReducer = (state, action) => {
    switch(action.type) {
        case "fetchUser": 
            return action.payload;
        case "updateUsersCredits":
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

function buyLightsaber (lightsaber, lightsaber_id, dispatch) {
    LightsaberAPIUtil.buyLightsaber(lightsaber, lightsaber_id).then( (single_lightsaber) => (
        dispatch({type: "buyLightsaber", payload: single_lightsaber})
    ), err => (
        dispatch({type: "buyLightsaberErrors", payload: err.responseJSON})
    ));
}

function fetchUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchUser", payload: current_user});
    })
}

function updateUsersCredits ( user, user_id , dispatch) {
    UserAPIUtil.updateUsersCredits(user, user_id).then((user) => {
        dispatch({type: "updateUsersCredits", payload: user})
    })
}

/////////COMPONENT HERE:
export default function Marketplace(props) {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [state, dispatch] = useReducer(lightsaberReducer, []);
    var [userState, userDispatch] = useReducer(userReducer);

    useEffect(() => {
        if (localStorageCurrentUser) {
            fetchAllTheLightsabers(dispatch);
            fetchUser(localStorageCurrentUser.id, userDispatch);
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch({type: "unmountAllLightsabers"})
        }
    }, [])

    const displayAllLightsabersForSale = state.map((lightsaber) => {
        if (lightsaber.forsale) {
            return (
                <div><Lightsaber 
                    buyLightsaber={buyLightsaber} 
                    dispatch={dispatch} 
                    lightsaber={lightsaber}
                    userDispatch={userDispatch}
                    userState={userState}
                    updateUsersCredits={updateUsersCredits}
                />
                </div>
            )
        }
    });
    if (localStorageCurrentUser) {
        return (
        <div id="marketplace-container">
            <div class="clearfix"></div>

            <UserInfo userState={userState}/>

            <div class="filters-bar">
                <select name="colorfilter" id="colorfilter"> 
                    <option value="none" selected disabled hidden> 
                        Color
                    </option> 
                        <option value="blue">blue</option> 
                        <option value="red">red </option> 
                        <option value="yellow">yellow</option> 
                        <option value="green">green</option> 
                        <option value="purple">purple</option> 
                </select> 

                <select name="style" id="style"> 
                    <option value="none" selected disabled hidden> 
                        Style
                    </option> 
                        <option value="single">Single-Bladed</option> 
                        <option value="double">Double-Bladed </option> 
                </select>

                <select name="sortBy" id="color"> 
                    <option value="none" selected disabled hidden> 
                        Sort By
                    </option> 
                        <option value="Most Recent">Most Recent</option> 
                        <option value="Price">Price</option> 
                </select> 
            </div>

            <div class="clearfix"></div>
            
            <div class="all-lightsabers-container">
                {displayAllLightsabersForSale.reverse()}
            </div>
            
        </div>
        )
    
    } else {
        return <h1 class="greeting-logged-in">You are not logged in. Click <Link to="/login">Here</Link> to login or <Link to="/signup">Here</Link> to sign up.</h1>
    }
}
