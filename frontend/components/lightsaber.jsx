import React from 'react'
import {updateUsersCredits} from './marketplace';

export default function Lightsaber({lightsaber, buyLightsaber, dispatch, userDispatch, userState}) {
    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");

    function handleBuyLightsaber () {
        var lightsaberState1 = {...lightsaber, user_id: userState.id, forsale: false};
        var userObject = {...userState, credits: userState.credits - lightsaber.price}
        var confirmMessage = confirm(`Are you sure you want to purchase ${lightsaber.name} ?`)
        if (confirmMessage) {
             if (userState.credits >= lightsaber.price) {
                buyLightsaber(lightsaberState1, lightsaber.id, dispatch);
                updateUsersCredits(userObject, userState.id, userDispatch)
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
