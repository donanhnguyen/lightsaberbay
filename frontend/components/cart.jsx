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
        case 'emptyOutCart':
            return [];
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

function updateUsersCredits (user, user_id) {
    UserAPIUtil.updateUsersCredits(user, user_id);
}

function updateOtherUsersCredits (user, user_id) {
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

export default function Cart(props) {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var cartArray = JSON.parse(localStorage.getItem('Cart'));
    var [userState, userDispatch] = useReducer(userReducer);
    var [otherUserState, otherUserDispatch] = useReducer(otherUserReducer, []);
    var [cartState, cartDispatch] = useReducer(cartReducer, cartArray);

    // modal
    var [modalMessage, setModalMessage] = useState("");
    var [showModal, toggleShowModal] = useState(false);

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
        if (localStorage.getItem('Cart')) {
            props.setCartInfoState(clientsArr.length);
        }
    }

    function handlePlaceOrder () {

        var newUsersCreditsAmount = {...userState, credits: userState.credits - calculatedTotal()};

        if (!cartState || cartState.length === 0) {
            toggleShowModal(true);
            setModalMessage(`There's nothing in your cart.`);
            setTimeout(() => {
                toggleShowModal(false);
                setModalMessage("");
            }, 1000)
            return;
        }

        var confirmMessage = confirm(`Are you sure you want to place this order of ${calculatedTotal()} credits?`)
        
        if (confirmMessage) {
             if (userState.credits >= calculatedTotal()) {
                 // gather total of purchase and subtract it from your credits.
                updateUsersCredits(newUsersCreditsAmount, userState.id);
                //
                for (let i = 0; i < cartState.length; i++) {
                    let currentSaber = cartState[i];
                    // create message sent to seller.
                    var messageToSellerObject = {
                        sender: userState.username,
                        body: `${userState.username} has purchased your item of ${currentSaber.name} for ${currentSaber.price} credits!`,
                        read: false
                    }
                    //
                    // find the owner of the lightsaber you're buying, and then pay that user.
                    var otherUserCreditsChange = null;
                    var correctUserId = null;
                    for (let j = 0; j < otherUserState.length; j++) {
                        var currentUser = otherUserState[j];
                        if (currentSaber.user_id === currentUser.id) {
                            otherUserCreditsChange = {...currentUser, credits: currentUser.credits + currentSaber.price};
                            correctUserId = currentUser.id;
                            break;
                        }
                    }
                    updateOtherUsersCredits(otherUserCreditsChange, correctUserId);
                    //
                    // change user_id of the lightsaber you're buying, and send message to seller.
                    var changedLightsaberObject = {...currentSaber, user_id: userState.id, forsale: false};
                    buyLightsaber(changedLightsaberObject, currentSaber.id);
                    sendMessageToSeller(messageToSellerObject, currentSaber.user_id)
                    //
                    // dispatch in order to empty out the cart, so the UI displays empty cart.
                    localStorage.setItem('Cart', JSON.stringify([]));
                    props.setCartInfoState(0);
                    cartDispatch({type: 'emptyOutCart'});
                    //
                }
            } else {
                toggleShowModal(true);
                setModalMessage(`You can't afford this purchase!`);
                setTimeout(() => {
                        toggleShowModal(false);
                        setModalMessage("");
                }, 1000)
            }
        }
       
    }

    if (localStorageCurrentUser) {
        return (
            <div>
                {/* modal */}
                <div class={`modal ${!showModal ? "hideModal" : ""}  `}>
                <div class="modal-content">
                    <h1>{modalMessage}</h1>
                    {/* <button onClick={() => toggleShowModal(false) } class="modal-close">&times</button> */}
                </div>
                </div>
                {/* modal */}
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
            </div>
            
        )   
    } else {
        return <div>You are not logged in!</div>
    }
    
}
