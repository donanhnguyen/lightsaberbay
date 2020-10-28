import React, {useReducer, useState, useEffect} from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import * as UserAPIUtil from '../util/user_api_util';
import LightsaberInsideCart from './lightsaberinsidecart';

const lightsaberReducer = (state, action) => {
    switch(action.type) {
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

function fetchUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchUser", payload: current_user});
    })
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
    var [userState, userDispatch] = useReducer(userReducer);
    var cartArray = JSON.parse(localStorage.getItem('Cart'));

    useEffect(() => {
        if (localStorageCurrentUser) {
            fetchUser(localStorageCurrentUser.id, userDispatch);
        }
    }, [])

    function displayCartItems () {
        var cart = cartArray;
        if (cart) {
           var displayCart = cart.map((lightsaber) => {
                return <LightsaberInsideCart
                    key={lightsaber.id} 
                    buyLightsaber={buyLightsaber}
                    dispatch={dispatch} 
                    lightsaber={lightsaber}
                    userDispatch={userDispatch}
                    userState={userState}
                />
            })
        return displayCart; 
        } else {
            return <h1>You have no items in shopping cart.</h1>
        }
    }
    
    return (
        <div id='cart'>
            <div id='shopping-cart-left-panel'>
                {displayCartItems()}
            </div>
            <div id='checkout-right-panel'>
                checkout info here
                <button class='buy-button'>Place Order</button>
            </div>
        </div>
    )
}
