import React, {useReducer, useState, useEffect} from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util';
import * as UserAPIUtil from '../util/user_api_util';
import LightsaberInsideCart from './lightsaberinsidecart';
import * as MessageAPIUtil from '../util/message_api_util';

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

const otherUserReducer = (state, action) => {
    switch(action.type) {
        case "fetchOtherUsers":
            var newState = state;
            newState.push(action.payload);
            return newState;
        default:
            return state;
    }
}

function updateUsersCredits ( user, user_id) {
    UserAPIUtil.updateUsersCredits(user, user_id);
}

function updateOtherUsersCredits ( user, user_id ) {
    UserAPIUtil.updateUsersCredits(user, user_id);
}

function sendMessageToSeller (message, user_id) {
    MessageAPIUtil.createMessage(message, user_id);
}

function fetchUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchUser", payload: current_user});
    })
}

function fetchOtherUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchOtherUsers", payload: current_user});
    })
}

function buyLightsaber (lightsaber, lightsaber_id) {
    LightsaberAPIUtil.buyLightsaber(lightsaber, lightsaber_id);
}

export default function cart() {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var cartArray = JSON.parse(localStorage.getItem('Cart'));
    var [userState, userDispatch] = useReducer(userReducer);
    var [otherUserState, otherUserDispatch] = useReducer(otherUserReducer, []);
    var [cartState, cartDispatch] = useReducer(cartReducer, cartArray);

    useEffect(() => {
        if (localStorageCurrentUser) {
            fetchUser(localStorageCurrentUser.id, userDispatch);
            if (cartArray) {
                cartArray.forEach((saber) => {
                    fetchOtherUser(saber.user_id, otherUserDispatch);
                })
            }
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

    function displayCalculateTotal () {
        var total = 0;
        if (cartState) {
            cartState.forEach((saber) => {total += saber.price});
            return <h1>Your total is {total} credits.</h1>
        }
    }

    function calculatedTotal () {
        var total = 0;
        if (cartState) {
            cartState.forEach((saber) => {total += saber.price});
        }
        return total;
    }

    function displayOrderDetails () {
        if (cartState) {
            var display = cartState.map((saber) => {return <h1>{saber.name} x 1</h1>}) 
        }
        return display;
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

        // var lightsaberState1 = {...lightsaber, user_id: userState.id, forsale: false};
        // var userObject = {...userState, credits: userState.credits - lightsaber.price};
        // var otherUserObject = {credits: otherUserState.credits + lightsaber.price}

        // var messageToSellerObject = {
        //     sender: userState.username,
        //     body: `${userState.username} has purchased your item of ${lightsaber.name} for ${lightsaber.price} credits!`,
        //     read: false
        // }

        // var confirmMessage = confirm(`Are you sure you want to purchase ${lightsaber.name} for ${lightsaber.price} credits?`)
        // if (confirmMessage) {
        //      if (userState.credits >= lightsaber.price) {
        //         buyLightsaber(lightsaberState1, lightsaber.id, dispatch);
        //         updateUsersCredits(userObject, userState.id, userDispatch);
        //         updateOtherUsersCredits(otherUserObject, lightsaber.user_id, otherUserDispatch);
        //         sendMessageToSeller(messageToSellerObject, lightsaber.user_id);
        //     } else {
        //         alert("You can't afford that item!")
        //     }
        // }

       

        console.log("other user state");
        console.log(otherUserState);
        // var newUsersCreditsAmount = {...userState, credits: userState.credits - calculatedTotal()};

        // var otherUserObject = {credits: otherUserState.credits + lightsaber.price}

        // var confirmMessage = confirm(`Are you sure you want to place this order of ${calculatedTotal()} credits?`)


        // if (confirmMessage) {
        //      if (userState.credits >= calculatedTotal()) {
        //         updateUsersCredits(newUsersCreditsAmount, userState.id);
        //         for (let i = 0; i < cartState.length; i++) {
        //             let currentSaber = cartState[i];

        //             var messageToSellerObject = {
        //                 sender: userState.username,
        //                 body: `${userState.username} has purchased your item of ${currentSaber.name} for ${currentSaber.price} credits!`,
        //                 read: false
        //             }

        //             var changedLightsaberObject = {...currentSaber, user_id: userState.id, forsale: false};
        //             buyLightsaber(changedLightsaberObject, currentSaber.id);
        //             sendMessageToSeller(messageToSellerObject, currentSaber.user_id)
        //         }
        //     } else {
        //         alert("You can't afford this purchase!")
        //     }
        // }
       
    }

    if (localStorageCurrentUser) {
        return (
            <div id='cart'>
                <div id='shopping-cart-left-panel'>
                    {displayCartItems()}
                </div>
                <div id='checkout-right-panel'>
                    
                    <div class='calculated-total'>

                        {displayOrderDetails()}

                        {displayCalculateTotal()}

                    </div>
                    
                    <div class='place-order-button-container'>
                        <button class='place-order-button' onClick={handlePlaceOrder} >Place Order</button>
                    </div>
                    
                </div>
            </div>
        )   
    } else {
        return <div>You are not logged in!</div>
    }
    
}
