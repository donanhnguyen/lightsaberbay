import React from 'react'


export default function Lightsaber({lightsaber, dispatch, buyLightsaber}) {

    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

    function handleBuyLightsaber () {
       
        var lightsaberState1 = {...lightsaber, user_id: localStorageCurrentUser.id};

        buyLightsaber(lightsaberState1, lightsaber.id, dispatch);
    }

    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");
    
    var buyButtonOrNot = () => {
        if (localStorageCurrentUser.id !== lightsaber.user_id) {
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
