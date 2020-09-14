import React, { useState } from 'react'
import * as LightsaberAPIUtil from '../util/lightsaber_api_util'

export default function UserLightsaber({updateLightsaberListing, dispatch, lightsaber}) {

    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [editingMode, changeEditMode] = useState(false);
    var [currentLightsaberPrice, changePrice] = useState(lightsaber.price);


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

    function handleChangePrice (e) {
        changePrice(e.target.value);
    }

    function submitChangeOfPrice () {
        console.log("new price is " + parseInt(currentLightsaberPrice))
        changeEditMode((prevState) => !prevState);
    }

    function handleToggleEditMode () {
        changeEditMode((prevState) => !prevState);
    }

    function editOrNotButton () {
        if (!editingMode) {
            return <button onClick={handleToggleEditMode} class="inventory-lightsaber-button">Edit Price</button>;
        } else {
            return <div>
                    <input onChange={handleChangePrice} type="number" id="newPrice "name="newPrice"></input>
                    <button class="inventory-lightsaber-button" onClick={handleToggleEditMode}>Cancel</button>
                    <button class="inventory-lightsaber-button" onClick={submitChangeOfPrice}>Change Price</button>
                </div>
        }
    }

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>{lightsaber.price} credits</h1>

            <div>
                {sellOrNotButton()}
            </div>
            <div >
                {editOrNotButton()}
            </div>
        </div>
    )
}
