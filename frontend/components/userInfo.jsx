import React, {useReducer, useEffect} from 'react'

export default function UserInfo({userState}) {

    var localCart = JSON.parse(localStorage.getItem('Cart'));
    console.log(localCart);

    function numberOfItemsInYourCart () {
        if (localCart) {return <h1 class='new-messages'>{localCart.length} items in your shopping cart</h1>}
    }

    if (userState) {
        return (
            <div class="userInfoBar">
                {numberOfItemsInYourCart()}
                Your Credits: {userState.credits}
             </div>
        )
    } else {
        return null;
    }
}
