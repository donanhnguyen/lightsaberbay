import React from 'react'


export default function Message ({message, updateMessageRead, dispatch}) {

    var messageDate = message.updated_at.split("")
    var displayMessageDate = messageDate.slice(5, 7).join("") + "-" + messageDate.slice(8, 10).join("") + "-" + messageDate.slice(0, 4).join("");
    const readOrUnreadClass = message.read ? "messageRead" : "messageUnread";

    function handleToggleRead () {
        var messageObject = {...message, read: !message.read};
        updateMessageRead(messageObject, message.user_id, message.id, dispatch);
    }

    function readOrUnreadButton () {
            if (message.read) {
                return <button onClick={handleToggleRead} class='toggle-read-button'>Mark as UnRead</button>
            } else {
                return <button onClick={handleToggleRead} class='toggle-read-button'>Mark as Read</button>
            }
    }

    return (
        <div class={`message ${readOrUnreadClass}`}>
            <h1>From: LightsaberBay Admin</h1>
            <p class='message-date'>{displayMessageDate}</p>
            <p>{message.body}</p>
            <div class="">
                {readOrUnreadButton()}
            </div>
        </div>
    )
}
