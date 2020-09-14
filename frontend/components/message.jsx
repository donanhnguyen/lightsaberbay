import React from 'react'


export default function Message ({message}) {

    console.log(message);
    var messageDate = message.updated_at.split("")
    var displayMessageDate = messageDate.slice(5, 7).join("") + "-" + messageDate.slice(8, 10).join("") + "-" + messageDate.slice(0, 4).join("");

    const readOrUnread = () => {
        var eleclass;
        if (message.read) {
            var eleclass = "messageRead";
        } else {
            var eleclass = "messageUnread"
        }
        return eleclass;
    }

    return (
        <div class={`message ${readOrUnread()}`}>
            <h1>From: LightsaberBay Admin</h1>
            <p class='message-date'>{displayMessageDate}</p>
            <p>{message.body}</p>
            <div class="">
                <button class='mark-as-unread-button'>Mark as Read</button>
            </div>
        </div>
    )
}
