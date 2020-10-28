import React from 'react';

export default function LightsaberInsideCart({lightsaber, buyLightsaber, dispatch, userDispatch, userState, removeFromCart}) {
    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");

    return (
        <div class={`lightsaber-in-cart-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1 style={{color: 'rgb(89, 213, 250)'}}>{lightsaber.price} Credits</h1>
            <h1 class='lightsaber-listed-date'>Listed on {displayLightsaberDate}</h1>

            <button onClick={() => {removeFromCart(lightsaber)}} class='remove-from-cart-button'>Remove from Cart</button>
        </div>
    )
}
