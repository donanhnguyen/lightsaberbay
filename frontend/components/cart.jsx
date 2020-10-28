import React, {useReducer, useState, useEffect} from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import * as UserAPIUtil from '../util/user_api_util';
import LightsaberInsideCart from './lightsaberinsidecart';

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'updateUsersCartAfterRemovingOne':
            var newState = state.filter((saber) => saber.id !== action.payload.id);
            return newState;
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
    var [userState, userDispatch] = useReducer(userReducer);
    var cartArray = JSON.parse(localStorage.getItem('Cart'));
    var [cartState, cartDispatch] = useReducer(cartReducer, cartArray);

    useEffect(() => {
        if (localStorageCurrentUser) {
            fetchUser(localStorageCurrentUser.id, userDispatch);
        }
    }, [])

    function displayCartItems () {
        var cart = cartState;
        if (cart && cart.length > 0) {
           var displayCart = cart.map((lightsaber) => {
                return <LightsaberInsideCart
                    key={lightsaber.id} 
                    buyLightsaber={buyLightsaber}
                    dispatch={cartDispatch} 
                    lightsaber={lightsaber}
                    userDispatch={userDispatch}
                    userState={userState}
                    removeFromCart={handleRemoveFromCart}
                />
            })
            return displayCart; 
        } else {
            return <h1>You have no items in shopping cart.</h1>
        }
    }

    function calculateTotal () {
        var total = 0;
        if (cartState) {
            cartState.forEach((saber) => {total += saber.price});
            return <h1>Your total is {total} credits.</h1>
        }
    }

    function handleRemoveFromCart (lightsaber) {
        let clientsArr = [];
        clientsArr = JSON.parse(localStorage.getItem('Cart'));
        clientsArr.forEach((saber, index) => {
            if (saber.id === lightsaber.id) {
                clientsArr.splice(index, 1);
            }
        })
        localStorage.setItem('Cart', JSON.stringify(clientsArr));
        cartDispatch({type: 'updateUsersCartAfterRemovingOne', payload: lightsaber});
    }

    function handlePlaceOrder () {

    }

    return (
        <div id='cart'>
            <div id='shopping-cart-left-panel'>
                {displayCartItems()}
            </div>
            <div id='checkout-right-panel'>
                


                {calculateTotal()}
                <div class='place-order-button-container'>
                    <button class='place-order-button' onClick={handlePlaceOrder} >Place Order</button>
                </div>
                
            </div>
        </div>
    )
}
