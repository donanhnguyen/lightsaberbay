import React, {useReducer, useEffect, useState} from 'react';
import * as UserAPIUtil from '../util/user_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

const otherUserReducer = (state, action) => {
    switch(action.type) {
        case "fetchOtherUser": 
            return action.payload;
        case "updateOtherUsersCredits":
            return action.payload;
        default:
            return state;
    }
}

function fetchOtherUser (user_id, dispatch) {
    UserAPIUtil.fetchUser(user_id).then((current_user) => {
        dispatch({type: "fetchOtherUser", payload: current_user});
    })
}

function updateOtherUsersCredits ( user, user_id , dispatch) {
    UserAPIUtil.updateUsersCredits(user, user_id).then((user) => {
        dispatch({type: "updateOtherUsersCredits", payload: user})
    })
}

function sendMessageToSeller (message, user_id) {
    MessageAPIUtil.createMessage(message, user_id);
}

export default function Lightsaber({lightsaber, buyLightsaber, dispatch, userDispatch, userState, updateUsersCredits, setCartInfoState}) {
    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");
    var [otherUserState, otherUserDispatch] = useReducer(otherUserReducer);
    var [isItInTheCartOrNotState, setInTheCartState] = useState(false);

    useEffect(() => {
        fetchOtherUser(lightsaber.user_id, otherUserDispatch);
    }, [])

    useEffect(() => {
        if (localStorage.getItem('Cart')) {
           var clientsArr = JSON.parse(localStorage.getItem('Cart'));
           var found = false;
            for (var i = 0; i < clientsArr.length; i++) {
                if (clientsArr[i].id === lightsaber.id) {
                    found = true;
                    break;
                }
            }
           if (found) {
               setInTheCartState(true);
           }
        }
    }, [isItInTheCartOrNotState])

    function handleBuyLightsaber () {
        var lightsaberState1 = {...lightsaber, user_id: userState.id, forsale: false};
        var userObject = {...userState, credits: userState.credits - lightsaber.price};
        var otherUserObject = {credits: otherUserState.credits + lightsaber.price}

        var messageToSellerObject = {
            sender: userState.username,
            body: `${userState.username} has purchased your item of ${lightsaber.name} for ${lightsaber.price} credits!`,
            read: false
        }

        var confirmMessage = confirm(`Are you sure you want to purchase ${lightsaber.name} for ${lightsaber.price} credits?`)
        if (confirmMessage) {
             if (userState.credits >= lightsaber.price) {
                buyLightsaber(lightsaberState1, lightsaber.id, dispatch);
                updateUsersCredits(userObject, userState.id, userDispatch);
                updateOtherUsersCredits(otherUserObject, lightsaber.user_id, otherUserDispatch);
                sendMessageToSeller(messageToSellerObject, lightsaber.user_id);
            } else {
                alert("You can't afford that item!")
            }
        }
       
    }

    var buyButtonOrNot = () => {
        if (userState) {
            if (userState.id !== lightsaber.user_id) {
                return <button onClick={handleBuyLightsaber} class="buy-button">Buy Now</button>;
            } else {
                return <h1 class='your-listing'>Your Listing</h1>
            }
        }
    }

    const handleAddToCart = (lightsaber) => {
        let clientsArr = [];
        if (!localStorage.getItem('Cart')) {
           clientsArr.push(lightsaber);
           localStorage.setItem('Cart', JSON.stringify(clientsArr));
           alert(`Added ${lightsaber.name} to your shopping cart!`);
        } else {
           clientsArr = JSON.parse(localStorage.getItem('Cart'));
           var found = false;
            for (var i = 0; i < clientsArr.length; i++) {
                if (clientsArr[i].id === lightsaber.id) {
                    found = true;
                    break;
                }
            }
           if (found) {
               alert("You've already added that item to your cart!");
               setInTheCartState(true);
           } else {
               clientsArr.push(lightsaber);
               localStorage.setItem('Cart', JSON.stringify(clientsArr));
               alert(`Added ${lightsaber.name} to your shopping cart!`);
           }
        }
        if (localStorage.getItem('Cart')) {
            var theCart = JSON.parse(localStorage.getItem('Cart'));
            setCartInfoState(theCart.length);
        }
    }

    const addToCartButtonOrNot = () => {
        if (userState) {
            if (userState.id !== lightsaber.user_id) {
                return <button onClick={() => {handleAddToCart(lightsaber)}} class='add-to-cart-button'>Add to Cart</button>;
            }
        }
    }

    const alreadyInCartOrNot = () => {
        if (isItInTheCartOrNotState) {
            return <h1 class='your-listing'>Already in cart!</h1>
        }
    }

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1 style={{color: 'rgb(89, 213, 250)'}} class='lightsaber-price'>{lightsaber.price} Credits</h1>
            <h1 class='lightsaber-listed-date'>Listed on {displayLightsaberDate}</h1>

            <div>
                {buyButtonOrNot()}
            </div>
            <div>
                {addToCartButtonOrNot()}
            </div>
            <div>
                {alreadyInCartOrNot()}
            </div>
        </div>
    )
}
