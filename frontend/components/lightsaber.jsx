import React, {useReducer, useEffect} from 'react';
import * as UserAPIUtil from '../util/user_api_util';

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

export default function Lightsaber({lightsaber, buyLightsaber, dispatch, userDispatch, userState, updateUsersCredits}) {
    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");

    var [otherUserState, otherUserDispatch] = useReducer(otherUserReducer);

    useEffect(() => {
        fetchOtherUser(lightsaber.user_id, otherUserDispatch);
    }, [])

    function handleBuyLightsaber () {
        var lightsaberState1 = {...lightsaber, user_id: userState.id, forsale: false};
        var userObject = {...userState, credits: userState.credits - lightsaber.price};

        var otherUserObject = {...otherUserState, credits: otherUserState.credits + lightsaber.price}

        var confirmMessage = confirm(`Are you sure you want to purchase ${lightsaber.name} for ${lightsaber.price} credits?`)
        if (confirmMessage) {
             if (userState.credits >= lightsaber.price) {
                buyLightsaber(lightsaberState1, lightsaber.id, dispatch);
                updateUsersCredits(userObject, userState.id, userDispatch);
                updateOtherUsersCredits(otherUserObject, lightsaber.user_id, otherUserDispatch);
            } else {
                alert("You can't afford that item!")
            }
        }
       
    }

    var buyButtonOrNot = () => {
        if (userState.id !== lightsaber.user_id) {
            return <button onClick={handleBuyLightsaber} class="add-to-cart-button">Buy</button>;
        } else {
            return <h1>Your Listing</h1>
        }
    }

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1>{lightsaber.price} credits</h1>
            <h1>Listed on {displayLightsaberDate}</h1>

            <div >
                {buyButtonOrNot()}
            </div>
        </div>
    )
}
