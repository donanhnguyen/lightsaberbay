import React, {useEffect, useReducer} from 'react'
import * as MessageAPIUtil from '../util/message_api_util';

const messagesReducer = (state, action) => {
    switch(action.type) {
        case "fetchMessages": 
            return action.payload;
        default:
            return state;
    }
}

function fetchAllMessages (user_id, dispatch) {
    MessageAPIUtil.fetchMessages(user_id).then((all_messages) =>  {
        dispatch({type: "fetchMessages", payload: all_messages})
    })
};

export default function Notifications({currentUser}) {
    
    var [messagesState, dispatchMessages] = useReducer(messagesReducer, []);

    useEffect(() => {
        if (currentUser) {
            fetchAllMessages(currentUser.id, dispatchMessages);
        }
    }, [])

    function displayNotification () {
        var numberOfUnreadMessages = 0;
        messagesState.forEach((message) => {
            if (!message.read) {numberOfUnreadMessages += 1};
        })
        if (numberOfUnreadMessages > 0) {
            return <h1 class='new-messages'>You have {numberOfUnreadMessages} unread messages!</h1>
        } else {
            return <h1 class='no-new-messages'>You have no new messages.</h1>
        }
    }

    return (
        <div>
            {displayNotification()}
        </div>
    )
}
