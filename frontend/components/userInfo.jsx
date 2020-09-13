import React, {useReducer, useEffect} from 'react'

export default function UserInfo({userState}) {
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
