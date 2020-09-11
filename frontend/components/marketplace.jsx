import React, { Component, useState, useReducer, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import Lightsaber from './lightsaber';
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';

const lightsaberReducer = (state, action) => {
    // Object.freeze(state)
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
            console.log(newState);
            return newState;
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
    ))
}

export default function Marketplace(props) {
    var [state, dispatch] = useReducer(lightsaberReducer, []);
    
    useEffect(() => {
        fetchAllTheLightsabers(dispatch);
    }, [])

    useEffect(() => {
        return () => {
            dispatch({type: "unmountAllLightsabers"})
        }
    }, [])

    const displayAllLightsabersForSale = state.map((lightsaber) => {
        if (lightsaber.forsale) {
            return <div><Lightsaber buyLightsaber={buyLightsaber} dispatch={dispatch} lightsaber={lightsaber}/></div>;
        }
    });
    
    return (
        <div id="marketplace-container">
            <div class="clearfix"></div>

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
}
