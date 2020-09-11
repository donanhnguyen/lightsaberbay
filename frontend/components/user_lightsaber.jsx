import React, { useState } from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util'

export default function UserLightsaber({updateLightsaberListing, dispatch, lightsaber}) {

    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

    function handleListOrUnlist (lightsaber) {
        var stateObject = {...lightsaber, forsale: !lightsaber.forsale};
        updateLightsaberListing(stateObject, stateObject.user_id, stateObject.id, dispatch);
    }

    const sellOrNotButton = () => {
        if (lightsaber.forsale) {
            return (<button onClick={() => handleListOrUnlist(lightsaber)} class="add-to-cart-button">Remove Listing</button>)
        } else {
            return (<button onClick={() => handleListOrUnlist(lightsaber)} class="add-to-cart-button">List on Marketplace</button>)
        }
    }

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>{lightsaber.price} credits</h1>

            <div >
                {sellOrNotButton()}
                <button class="add-to-cart-button">Edit Price</button>
            </div>
        </div>
    )
}
