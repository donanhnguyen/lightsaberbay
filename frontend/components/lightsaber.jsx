import React from 'react'

export default function Lightsaber({lightsaber}) {

    var lightsaberDate = lightsaber.updated_at.split("")
    var displayLightsaberDate = lightsaberDate.slice(5, 7).join("") + "-" + lightsaberDate.slice(8, 10).join("") + "-" + lightsaberDate.slice(0, 4).join("");
    
    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1>{lightsaber.price} credits</h1>
            <h1>Listed on {displayLightsaberDate}</h1>


            <div >
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    )
}
