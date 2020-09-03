import React from 'react'

export default function Lightsaber({lightsaber}) {

    return (
        <div class={`lightsaber-item ${lightsaber.color + lightsaber.style}`}>
            <h1>{lightsaber.name}</h1>
            <h1>Seller: {lightsaber.owner}</h1>
            <h1>{lightsaber.price} credits</h1>
            <h1>Listed on {lightsaber.updated_at}</h1>


            <div >
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    )
}
