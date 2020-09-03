import React, { Component } from 'react'

export const fetchMessages = (user_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/messages`
    })
};

export const createBudget = (user_id, message) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${user_id}/messages`,
        data: {message}
    })
);

export class Messages extends Component {
    render() {
        return (
            <div>
                messaages here
                CurrentUser.messages
            </div>
        )
    }
}

export default Messages
