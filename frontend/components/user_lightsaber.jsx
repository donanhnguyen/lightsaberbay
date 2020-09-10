import React, { useState } from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util'

export default function UserLightsaber({updateLightsaberListing, dispatch, lightsaber}) {

    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

    const [state, setState] = useState({
        id: lightsaber.id,
        name: lightsaber.name, 
        style: lightsaber.style,
        price: lightsaber.price,
        color: lightsaber.color,
        forsale: lightsaber.forsale,
        user_id: lightsaber.user_id,
        lat: lightsaber.lat,
        lng: lightsaber.lng
    });

    function handleListOrUnlist () {
        setState((prevState) => {
            return {...prevState, forsale: !prevState.forsale}
        });
        var stateObject = {...state, forsale: state.forsale ? false : true};
        updateLightsaberListing(stateObject, state.user_id, state.id, dispatch);
        console.log(stateObject);
    }

    const sellOrNotButton = () => {
        if (lightsaber.forsale) {
            return (<button onClick={handleListOrUnlist} class="add-to-cart-button">Remove Listing</button>)
        } else {
            return (<button onClick={handleListOrUnlist} class="add-to-cart-button">List on Marketplace</button>)
        }
    }

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1>{lightsaber.price} credits</h1>

            <div >
                {sellOrNotButton()}
                <button class="add-to-cart-button">Edit Price</button>
            </div>
        </div>
    )
}
