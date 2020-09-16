import React, { useState } from 'react'

export default function UserLightsaber({updateLightsaberListing, dispatch, lightsaber, key}) {

    var [editingMode, changeEditMode] = useState(false);
    var [currentLightsaberPrice, changePrice] = useState(lightsaber.price);

    function handleListOrUnlist (lightsaber) {
        var stateObject = {...lightsaber, forsale: !lightsaber.forsale};
        updateLightsaberListing(stateObject, lightsaber.user_id, lightsaber.id, dispatch);
        changeEditMode(false);        
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
        var newLightsaberObject = {...lightsaber, price: parseInt(currentLightsaberPrice) };
        updateLightsaberListing(newLightsaberObject, lightsaber.user_id, lightsaber.id, dispatch)
        changeEditMode(false);
    }

    function handleToggleEditMode () {
        changeEditMode((prevState) => !prevState);
    }

    function handleCancelEdit () {
        changeEditMode(false);
        changePrice(lightsaber.price);
    }

    function editOrNotButton () {
        if (!editingMode) {
            return <button onClick={handleToggleEditMode} class="inventory-lightsaber-button">Edit Price</button>;
        } else {
            return <div>
                    <input onChange={handleChangePrice} type="number" id="newPrice "name="newPrice"></input>
                    <button class="inventory-lightsaber-button" onClick={submitChangeOfPrice}>Change Price</button>
                    <button class="inventory-lightsaber-button" onClick={handleCancelEdit}>Cancel</button>
                </div>
        }
    }
    
    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>{lightsaber.price} Credits</h1>

            <div>
                {sellOrNotButton()}
            </div>
            <div >
                {editOrNotButton()}
            </div>
        </div>
    )
}
