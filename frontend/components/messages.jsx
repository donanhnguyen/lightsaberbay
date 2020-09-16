import React, {useReducer, useEffect } from 'react'
import {Link} from 'react-router-dom';
import * as MessageAPIUtil from '../util/message_api_util';
import Message from './message';

const messagesReducer = (state, action) => {
    switch(action.type) {
        case "fetchMessages": 
            return action.payload;
        case "updateMessage":
           var newOne = state.map((message) => {
                if (message.id === action.payload.id) {
                    return action.payload;
                } else {
                    return message;
                }
            })
            return newOne;
        default:
            return state;
    }
}

function fetchAllMessages (user_id, dispatch) {
    MessageAPIUtil.fetchMessages(user_id).then((all_messages) =>  {
        dispatch({type: "fetchMessages", payload: all_messages})
    })
};

function updateMessageRead (message, user_id, message_id, dispatch) {
    MessageAPIUtil.updateMessageRead(message, user_id, message_id).then((message) =>  {
        dispatch({type: "updateMessage", payload: message})
    })
}

export default function Messages () {
    var localStorageCurrentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var [messagesState, dispatchMessages] = useReducer(messagesReducer, []);

    useEffect(() => {
        if (localStorageCurrentUser) {
              fetchAllMessages(localStorageCurrentUser.id, dispatchMessages);
        }
    }, [])

    const displayMessages = messagesState.map((message) => {
        return <Message message={message} updateMessageRead={updateMessageRead} dispatch={dispatchMessages}/>
    })

    if (localStorageCurrentUser) {
        return (
            <div>
                {displayMessages.reverse()}
            </div>
        )
    } else {
        return <h1 class="greeting-logged-in">You are not logged in. Click <Link to="/login">Here</Link> to login or <Link to="/signup">Here</Link> to sign up.</h1>
    }
   
}
