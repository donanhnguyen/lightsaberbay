import React, {useReducer, useEffect} from 'react'

export default function UserInfo({userState}) {

    var localCart = JSON.parse(localStorage.getItem('Cart'));

    function numberOfItemsInYourCart () {
        if (localCart && localCart.length>0) {return <h1 class='new-messages'>{localCart.length} items in your shopping cart</h1>}
    }

    if (userState) {
        return (
            <div class="userInfoBar">
                Your Credits: {userState.credits}
             </div>
        )
    } else {
        return null;
    }
}
